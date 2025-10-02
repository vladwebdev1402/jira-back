import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserJobSpaceEntity } from './user-job-space.entity';
import { UserJobSpaceRepository } from './user-job-space.repository';

@Module({
	imports: [TypeOrmModule.forFeature([UserJobSpaceEntity])],
	providers: [UserJobSpaceRepository],
	exports: [UserJobSpaceRepository],
})
export class UserJobSpaceRepositoryModule {}
