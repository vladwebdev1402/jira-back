import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bullmq';

export const getBullMqConfig = async (configService: ConfigService): Promise<QueueOptions> => ({
	connection: {
		host: configService.get('REDIS_HOST'),
		port: Number(configService.get('REDIS_PORT')),
		db: Number(configService.get('REDIS_DB')) || 1,
	},
});
