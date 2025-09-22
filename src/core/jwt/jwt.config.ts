import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
	const secret = configService.get('JWT_ACCESS_SECRET');

	if (!secret) throw new Error('JWT_ACCESS_SECRET not found in env file');

	return {
		global: true,
		secret: configService.get('JWT_ACCESS_SECRET'),
		signOptions: {
			expiresIn: configService.get('JWT_ACCESS_EXP'),
		},
	};
};
