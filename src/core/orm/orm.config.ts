import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export const dataSource = new DataSource({
	type: 'postgres',
	host: configService.get('DB_HOST'),
	port: Number(configService.get('DB_PORT')),
	username: configService.get('DB_USER'),
	password: configService.get('DB_PASSWORD'),
	database: configService.get('DB_DATABASE'),
	entities: ['dist/core/orm/entities/**/*.js'],
	migrations: ['dist/core/orm/migrations/*.js'],
	migrationsTableName: 'migrations',
});
