import { Module } from '@nestjs/common';
import { MailerModule as BaseMailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer.service';

@Module({
	imports: [BaseMailerModule, ConfigModule],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule {}
