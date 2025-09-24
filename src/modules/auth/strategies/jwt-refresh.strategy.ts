import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtUser } from 'common/types/jwt-user';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const token = request.cookies.refresh_token;

					if (!token) throw new ForbiddenException();

					return token;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET')!,
		});
	}

	async validate(user: JwtUser) {
		return user;
	}
}
