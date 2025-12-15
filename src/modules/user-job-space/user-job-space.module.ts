import { Module } from '@nestjs/common';
import { UserJobSpaceRepositoryModule } from 'core/orm/entities/user-job-space/user-job-space.module';
import { JobSpaceRepositoryModule } from 'core/orm/entities/job-space/job-space.module';
import { UserJobSpaceController } from './user-job-space.controller';
import { UserJobSpaceService } from './user-job-space.service';

@Module({
	imports: [UserJobSpaceRepositoryModule, JobSpaceRepositoryModule],
	controllers: [UserJobSpaceController],
	providers: [UserJobSpaceService],
})
export class UserJobSpaceModule {}
