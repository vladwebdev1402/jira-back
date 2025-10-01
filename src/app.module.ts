import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getBullMqConfig } from 'core/bull-mq/bull-mq.config';
import { getJwtConfig } from 'core/jwt/jwt.config';
import { getNodemailerConfig } from 'core/nodemailer/nodemailer.config';
import { dataSource } from 'core/orm/orm.config';
import { getRedisConfig } from 'core/redis/redis.config';
import { AuthModule } from 'modules/auth/auth.module';
import { JwtAuthGuard } from 'modules/auth/guards/jwt.guard';
import { ProfileModule } from 'modules/profile/profile.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			...dataSource.options,
		}),
		CacheModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getRedisConfig,
			isGlobal: true,
		}),
		BullModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getBullMqConfig,
		}),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getNodemailerConfig,
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		AuthModule,
		ProfileModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
