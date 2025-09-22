import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './entities/user/user.entity';
import { SessionEntity } from './entities/session/session.entity';

export const getOrmConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: configService.get('DB_HOST'),
	port: Number(configService.get('DB_PORT')),
	username: configService.get('DB_USER'),
	password: configService.get('DB_PASSWORD'),
	database: configService.get('DB_DATABASE'),
	entities: [UserEntity, SessionEntity],
	synchronize: true,
});
