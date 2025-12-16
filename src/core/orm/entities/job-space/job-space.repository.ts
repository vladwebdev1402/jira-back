import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { JobSpaceEntity } from './job-space.entity';

@Injectable()
export class JobSpaceRepository {
	constructor(@InjectRepository(JobSpaceEntity) private repository: Repository<JobSpaceEntity>) {}

	async findOne(options: FindManyOptions<JobSpaceEntity>) {
		return this.repository.findOne(options);
	}

	async find(options: FindManyOptions<JobSpaceEntity>) {
		return this.repository.find(options);
	}

	async count(options: FindManyOptions<JobSpaceEntity>) {
		return this.repository.count(options);
	}

	async create(data: DeepPartial<JobSpaceEntity>) {
		return this.repository.save(data);
	}

	async edit(where: FindOptionsWhere<JobSpaceEntity>, data: Partial<JobSpaceEntity>) {
		return this.repository.update(where, data);
	}

	async remove(data: JobSpaceEntity[]) {
		return this.repository.remove(data);
	}
}
