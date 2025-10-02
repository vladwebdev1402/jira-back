import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSpaceEntity } from './job-space.entity';
import { JobSpaceRepository } from './job-space.repository';

@Module({
	imports: [TypeOrmModule.forFeature([JobSpaceEntity])],
	providers: [JobSpaceRepository],
	exports: [JobSpaceRepository],
})
export class JobSpaceRepositoryModule {}
