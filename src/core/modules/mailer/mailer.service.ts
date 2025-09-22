import { MailerService as BaseMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
	constructor(
		private configService: ConfigService,
		private mailService: BaseMailerService,
	) {}

	async sendOtp(to: string, otp: number) {
		try {
			const info = await this.mailService.sendMail({
				from: {
					address: this.configService.getOrThrow('MAIL_USER'),
					name: 'VladWebDevJira',
				},
				to,
				subject: `Verification code`,
				template: '../../nodemailer/templates/otp',
				context: { otp },
			});

			console.log('OTP SENDED', info);
		} catch (e) {
			console.error('SEND OTP ERROR', e);
		}
	}
}
