import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationApi } from 'common/decorators/pagination';
import { JobSpaceRepository } from 'core/orm/entities/job-space/job-space.repository';
import { UserJobSpaceRepository } from 'core/orm/entities/user-job-space/user-job-space.repository';
import { CLIENT_ERRORS } from 'common/constants/errors';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';
import { USER_JOB_SPACE_PERMISSIONS_BY_ROLE } from 'common/enums/user-job-space-permission';
import { JobSpaceCreateDto } from './dtos/job-space-create.dto';
import { JobSpaceUpdateDto } from './dtos/job-space-update.dto';

const LIMIT_CREATE_JOB_SPACE = 3;

@Injectable()
export class JobSpaceService {
	constructor(
		private jobSpaceRepository: JobSpaceRepository,
		private userJobSpaceRepository: UserJobSpaceRepository,
	) {}

	async findAll(userId: number, pagination: PaginationApi) {
		return this.jobSpaceRepository.find({
			where: {
				users: {
					isUnlinked: false,
					user: {
						id: userId,
					},
				},
			},
			skip: pagination.skip,
			take: pagination.limit,
		});
	}

	async create(userId: number, dto: JobSpaceCreateDto) {
		const existJobSpace = await this.jobSpaceRepository.find({
			where: {
				name: dto.name,
				users: {
					isCreator: true,
					user: {
						id: userId,
					},
				},
			},
		});

		if (existJobSpace.length > 0) throw new BadRequestException(CLIENT_ERRORS.jobSpaceNameExist);

		const countJobSpace = await this.jobSpaceRepository.count({
			where: {
				users: {
					isCreator: true,
					user: {
						id: userId,
					},
				},
			},
		});

		if (countJobSpace >= LIMIT_CREATE_JOB_SPACE)
			throw new BadRequestException(CLIENT_ERRORS.jobSpaceLimit);

		const jobSpace = await this.jobSpaceRepository.create({
			name: dto.name,
		});

		await this.userJobSpaceRepository.create({
			isCreator: true,
			role: UserJobSpaceRole.admin,
			permissions: USER_JOB_SPACE_PERMISSIONS_BY_ROLE.admin,
			jobSpace: {
				id: jobSpace.id,
			},
			user: {
				id: userId,
			},
		});

		return jobSpace;
	}

	async update(id: number, userId: number, dto: JobSpaceUpdateDto) {
		const jobSpace = await this.jobSpaceRepository.findOne({
			where: {
				id,
				users: {
					isCreator: true,
					user: {
						id: userId,
					},
				},
			},
		});

		if (!jobSpace) throw new NotFoundException(CLIENT_ERRORS.jobSpaceNotFound);

		const existsName = await this.jobSpaceRepository.findOne({
			where: {
				name: dto.name,
				users: {
					isCreator: true,
					user: {
						id: userId,
					},
				},
			},
		});

		if (existsName) throw new BadRequestException(CLIENT_ERRORS.jobSpaceNameExist);

		await this.jobSpaceRepository.edit({ id }, { ...dto });

		return { ...jobSpace, ...dto };
	}

	async delete(id: number, userId: number) {
		const jobSpace = await this.jobSpaceRepository.findOne({
			where: {
				id,
				users: {
					isCreator: true,
					user: {
						id: userId,
					},
				},
			},
		});

		if (!jobSpace) throw new NotFoundException(CLIENT_ERRORS.jobSpaceNotFound);

		await this.jobSpaceRepository.remove([jobSpace]);

		return { success: true };
	}
}
