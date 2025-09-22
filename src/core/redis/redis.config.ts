import { createKeyv } from '@keyv/redis';
import { ConfigService } from '@nestjs/config';
import { CacheOptions } from '@nestjs/cache-manager';
import { CACHE_TTL } from 'common/constants/cache';

export const getRedisConfig = async (configService: ConfigService): Promise<CacheOptions> => ({
	ttl: CACHE_TTL,
	stores: [
		createKeyv(`redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`),
	],
});
