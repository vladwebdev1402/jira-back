import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { UserModel } from 'core/orm/entities/user/user.model';
import { User } from 'common/decorators/user';
import { JwtUser } from 'common/types/jwt-user';
import { Profile } from 'passport-google-oauth20';
import { Public } from 'common/decorators/public';
import { AuthLoginEmailDto } from './dtos/auth-login-email.dto';
import { AuthService } from './auth.service';
import { AuthLoginEmailResponseDto } from './dtos/auth-login-email-response.dto';
import { AuthLoginOtpDto } from './dtos/auth-login-otp.dto';
import { AuthLoginResponseDto } from './dtos/auth-login-response.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private configService: ConfigService,
	) {}

	@Post('login/email')
	@Public()
	@ApiResponse({ type: AuthLoginEmailResponseDto })
	async loginEmail(@Body() loginEmailDto: AuthLoginEmailDto) {
		return this.authService.loginEmail(loginEmailDto.email);
	}

	@Post('login/otp')
	@Public()
	@ApiResponse({ type: AuthLoginResponseDto })
	async loginOtp(@Body() loginOtpDto: AuthLoginOtpDto, @Res() res: Response) {
		const { user, accessToken, refreshToken } = await this.authService.loginOtp(loginOtpDto);

		this.setCookie(res, refreshToken);

		return res.status(200).json({ ...plainToClass(UserModel, user), accessToken });
	}

	@Get('login/google')
	@Public()
	@UseGuards(GoogleAuthGuard)
	async loginGoogle() {
		return { status: 'OK' };
	}

	@Get('login/google/callback')
	@Public()
	@HttpCode(302)
	@UseGuards(GoogleAuthGuard)
	async loginGoogleCallback(@Req() req: Request, @Res() res: Response) {
		const profile = req.user as Profile;

		if (!profile.emails) throw new BadRequestException();

		const email = profile.emails[0].value;

		const avatarUrl = profile.photos ? profile.photos[0].value : '';

		const name = profile.displayName ? profile.displayName : '';

		const { refreshToken } = await this.authService.loginOAuth({ email, avatarUrl, name });

		this.setCookie(res, refreshToken);

		return res.redirect(this.configService.getOrThrow('OAUTH_CLIENT_URL'));
	}

	@Post('/refresh')
	@Public()
	@ApiBearerAuth()
	@UseGuards(JwtRefreshAuthGuard)
	async refresh(@User() u: JwtUser, @Req() req: Request, @Res() res: Response) {
		const rToken = req.cookies.refresh_token;

		const aToken = req.headers.authorization?.split(' ')[1] as string;

		res.clearCookie('refresh_token');

		const { user, accessToken, refreshToken } = await this.authService.refresh(
			u.id,
			aToken,
			rToken,
		);

		this.setCookie(res, refreshToken);

		return res.status(200).json({ ...plainToClass(UserModel, user), accessToken });
	}

	@Delete()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	async logout(@User() user: JwtUser, @Req() req: Request, @Res() res: Response) {
		const rToken = req.cookies.refresh_token;

		const aToken = req.headers.authorization?.split(' ')[1] as string;

		res.clearCookie('refresh_token');

		await this.authService.logout(user.id, aToken, rToken);

		return res.status(200).json();
	}

	private setCookie(res: Response, refreshToken: string) {
		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			expires: new Date(Date.now() + ms(`${this.configService.getOrThrow('JWT_REFRESH_EXP')}`)),
			secure: true,
			sameSite: 'none',
		});
	}
}
