import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
		dir: `${process.cwd()}/src/core/nodemailer/templates`,
		adapter: new HandlebarsAdapter(undefined, {
			inlineCssEnabled: true,
		}),
		options: {
			strict: true,
		},
	},
});
