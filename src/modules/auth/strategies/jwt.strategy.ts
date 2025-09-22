import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { CACHE_KEYS } from 'common/constants/cache';
import { JwtUser } from 'common/types/jwt-user';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		configService: ConfigService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: JwtUser) {
		const token = request.headers.authorization?.split(' ')[1] as string;

		const cachedToken = await this.cacheManager.get<boolean>(`${CACHE_KEYS.accessToken}-${token}`);

		if (cachedToken) throw new UnauthorizedException();

		return payload;
	}
}
