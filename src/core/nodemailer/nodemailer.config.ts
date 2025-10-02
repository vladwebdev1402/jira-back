import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const getNodemailerConfig = async (
	configService: ConfigService,
): Promise<MailerOptions> => ({
	transport: {
		host: configService.get('MAIL_HOST'),
		auth: {
			user: configService.get('MAIL_USER'),
			pass: configService.get('MAIL_PASS'),
		},
	},
	template: {
		dir: join(__dirname, `./templates`),
		adapter: new HandlebarsAdapter(undefined, {
			inlineCssEnabled: true,
		}),
		options: {
			strict: true,
		},
	},
});
