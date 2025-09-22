import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { JOBS, QUEUES } from 'common/constants/queues';
import { MailerService } from 'core/modules/mailer/mailer.service';
import { AuthSendOtp } from './types/auth-send-otp';

@Processor(QUEUES.auth)
export class AuthConsumer extends WorkerHost {
	constructor(private mailerService: MailerService) {
		super();
	}

	async process(job: Job<unknown, unknown, string>) {
		if (job.name === JOBS.sendOtp) {
			const { email, otp } = job.data as AuthSendOtp;

			await this.mailerService.sendOtp(email, otp);
		}
	}
}
