import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as ms from 'ms';
import { Cache } from 'cache-manager';
import { CACHE_KEYS, CACHE_TTL } from 'common/constants/cache';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JOBS, QUEUES } from 'common/constants/queues';
import { CLIENT_ERRORS } from 'common/constants/errors';
import { UserRepository } from 'core/orm/entities/user/user.repository';
import { SessionRepository } from 'core/orm/entities/session/session.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hashSync, compareSync } from 'bcryptjs';
import { UserEntity } from 'core/orm/entities/user/user.entity';
import { AuthCache } from './types/auth-cache';
import { AuthLoginEmailResponseDto } from './dtos/auth-login-email-response.dto';
import { AuthLoginOtpDto } from './dtos/auth-login-otp.dto';
import { AuthOAuthProfile } from './types/auth-oauth-profile';

@Injectable()
export class AuthService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		@InjectQueue(QUEUES.auth) private authQueue: Queue,
		private configService: ConfigService,
		private jwtService: JwtService,
		private userRepository: UserRepository,
		private sessionRepository: SessionRepository,
	) {}

	async loginEmail(email: string): Promise<AuthLoginEmailResponseDto> {
		const cached = await this.cacheManager.get<AuthCache>(email);

		if (!cached) {
			const otp = Math.floor(100000 + Math.random() * 900000);

			const endTime = Date.now() + CACHE_TTL;

			const cache = {
				endDate: endTime,
				code: otp,
			};

			await this.cacheManager.set(email, cache);

			await this.authQueue.add(JOBS.sendOtp, {
				email,
				otp,
			});

			return { timeout: CACHE_TTL };
		}

		return { timeout: new Date(cached.endDate).getTime() - Date.now() };
	}

	async loginOtp({ email, otp }: AuthLoginOtpDto) {
		const cached = await this.cacheManager.get<AuthCache>(email);

		if (!cached) {
			throw new BadRequestException(CLIENT_ERRORS.authInvalidOtp);
		}

		if (cached.code !== otp) {
			throw new BadRequestException(CLIENT_ERRORS.authInvalidOtp);
		}

		await this.cacheManager.del(email);

		let user = await this.userRepository.getByEmail(email);

		if (!user) user = await this.userRepository.create({ email });

		return this.createTokens(user);
	}

	async loginOAuth(profile: AuthOAuthProfile) {
		let user = await this.userRepository.getByEmail(profile.email);

		if (!user) {
			user = await this.userRepository.create({
				email: profile.email,
				avatarUrl: profile.avatarUrl,
				name: profile.name,
				displayName: profile.name,
			});
		}

		return this.createTokens(user);
	}

	async refresh(userId: number, accessToken: string, refreshToken: string) {
		await this.removeSession(userId, refreshToken);

		const user = await this.userRepository.getById(userId);

		if (!user) throw new BadRequestException(CLIENT_ERRORS.userNotFound);

		await this.cacheManager.set(
			`${CACHE_KEYS.accessToken}-${accessToken}`,
			true,
			ms(`${this.configService.getOrThrow('JWT_ACCESS_EXP')}`),
		);

		return this.createTokens(user);
	}

	async logout(userId: number, accessToken: string, refreshToken: string) {
		await this.removeSession(userId, refreshToken);

		await this.cacheManager.set(
			`${CACHE_KEYS.accessToken}-${accessToken}`,
			true,
			ms(`${this.configService.getOrThrow('JWT_ACCESS_EXP')}`),
		);
	}

	async createTokens(user: UserEntity) {
		const accessToken = this.jwtService.sign(
			{ id: user.id, role: user.role },
			{
				expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXP'),
				secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
			},
		);

		const refreshToken = this.jwtService.sign(
			{ id: user.id, role: user.role },
			{
				expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXP'),
				secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
			},
		);

		const ended = Date.now() + ms(`${this.configService.getOrThrow('JWT_REFRESH_EXP')}`);

		await this.sessionRepository.create({
			token: hashSync(refreshToken, 10),
			ended: new Date(ended),
			user,
		});

		return { user, accessToken, refreshToken };
	}

	async removeSession(userId: number, token: string) {
		const sessions = await this.sessionRepository.findByUserId(userId);

		const session = sessions.find((s) => compareSync(token, s.token));

		if (!session) throw new ForbiddenException();

		await this.sessionRepository.remove([session]);
	}
}
