import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from 'common/constants/queues';
import { MailerModule } from 'core/modules/mailer/mailer.module';
import { UserRepositoryModule } from 'core/orm/entities/user/user.module';
import { SessionRepositoryModule } from 'core/orm/entities/session/session.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthConsumer } from './auth.consumer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
	imports: [
		MailerModule,
		JwtModule,
		BullModule.registerQueue({ name: QUEUES.auth }),
		ConfigModule,
		UserRepositoryModule,
		SessionRepositoryModule,
	],
	providers: [AuthService, AuthConsumer, JwtStrategy, JwtRefreshStrategy, GoogleStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
