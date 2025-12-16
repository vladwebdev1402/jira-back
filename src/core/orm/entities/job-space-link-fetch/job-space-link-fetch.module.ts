import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSpaceLinkFetchEntity } from './job-space-link-fetch.entity';
import { JobSpaceLinkFetchRepository } from './job-space-link-fetch.repository';

@Module({
	imports: [TypeOrmModule.forFeature([JobSpaceLinkFetchEntity])],
	providers: [JobSpaceLinkFetchRepository],
	exports: [JobSpaceLinkFetchRepository],
})
export class JobSpaceLinkFetchRepositoryModule {}
