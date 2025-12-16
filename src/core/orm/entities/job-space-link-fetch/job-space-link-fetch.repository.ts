import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { JobSpaceLinkFetchEntity } from './job-space-link-fetch.entity';

@Injectable()
export class JobSpaceLinkFetchRepository {
	constructor(
		@InjectRepository(JobSpaceLinkFetchEntity)
		private repository: Repository<JobSpaceLinkFetchEntity>,
	) {}

	async find(options: FindManyOptions<JobSpaceLinkFetchEntity>) {
		return this.repository.find(options);
	}

	async findAndCount(options: FindManyOptions<JobSpaceLinkFetchEntity>) {
		return this.repository.findAndCount(options);
	}

	async findOne(options: FindOneOptions<JobSpaceLinkFetchEntity>) {
		return this.repository.findOne(options);
	}

	async findByEmailAndJobSpaceId(email: string, jobSpaceId: number) {
		return this.repository.findOne({
			where: {
				email,
				jobSpace: {
					id: jobSpaceId,
				},
			},
		});
	}

	async create(data: DeepPartial<JobSpaceLinkFetchEntity>) {
		return this.repository.save(data);
	}

	async remove(data: JobSpaceLinkFetchEntity[]) {
		return this.repository.remove(data);
	}
}
