import { Module } from '@nestjs/common';
import { JobSpaceLinkFetchRepositoryModule } from 'core/orm/entities/job-space-link-fetch/job-space-link-fetch.module';
import { JobSpaceRepositoryModule } from 'core/orm/entities/job-space/job-space.module';
import { UserJobSpaceRepositoryModule } from 'core/orm/entities/user-job-space/user-job-space.module';
import { JobSpaceLinkFetchController } from './job-space-link-fetch.controller';
import { JobSpaceLinkFetchService } from './job-space-link-fetch.service';

@Module({
	imports: [
		UserJobSpaceRepositoryModule,
		JobSpaceRepositoryModule,
		JobSpaceLinkFetchRepositoryModule,
	],
	controllers: [JobSpaceLinkFetchController],
	providers: [JobSpaceLinkFetchService],
})
export class JobSpaceLinkFetchModule {}
