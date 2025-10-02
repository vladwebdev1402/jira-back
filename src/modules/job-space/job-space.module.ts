import { Module } from '@nestjs/common';
import { JobSpaceRepositoryModule } from 'core/orm/entities/job-space/job-space.module';
import { UserJobSpaceRepositoryModule } from 'core/orm/entities/user-job-space/user-job-space.module';
import { JobSpaceController } from './job-space.controller';
import { JobSpaceService } from './job-space.service';

@Module({
	imports: [JobSpaceRepositoryModule, UserJobSpaceRepositoryModule],
	controllers: [JobSpaceController],
	providers: [JobSpaceService],
})
export class JobSpaceModule {}
