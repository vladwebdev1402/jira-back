import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	Repository,
} from 'typeorm';
import {
	USER_JOB_SPACE_PERMISSIONS_BY_ROLE,
	UserJobSpacePermission,
} from 'common/enums/user-job-space-permission';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';
import { UserJobSpaceEntity } from './user-job-space.entity';

@Injectable()
export class UserJobSpaceRepository {
	constructor(
		@InjectRepository(UserJobSpaceEntity) private repository: Repository<UserJobSpaceEntity>,
	) {}

	async find(options: FindManyOptions<UserJobSpaceEntity>) {
		return this.repository.find(options);
	}

	async findAndCount(options: FindManyOptions<UserJobSpaceEntity>) {
		return this.repository.findAndCount(options);
	}

	async findOne(options: FindOneOptions<UserJobSpaceEntity>) {
		return this.repository.findOne(options);
	}

	async create(data: DeepPartial<UserJobSpaceEntity>) {
		return this.repository.save(data);
	}

	async edit(where: FindOptionsWhere<UserJobSpaceEntity>, data: Partial<UserJobSpaceEntity>) {
		return this.repository.update(where, data);
	}

	async unLink(where: FindOptionsWhere<UserJobSpaceEntity>) {
		return this.repository.update(where, { isUnlinked: true });
	}

	async havePermissions(
		permissions: UserJobSpacePermission[],
		where: FindOptionsWhere<UserJobSpaceEntity>,
	) {
		const userJobSpace = await this.repository
			.createQueryBuilder('userJobSpace')
			.where(where)
			.andWhere('userJobSpace.permissions @> :permissions', { permissions })
			.getOne();

		return !!userJobSpace;
	}

	async changeRole(role: UserJobSpaceRole, where: FindOptionsWhere<UserJobSpaceEntity>) {
		return this.repository.update(where, {
			role,
			permissions: USER_JOB_SPACE_PERMISSIONS_BY_ROLE[role],
		});
	}

	getRequiredLinkPermissionsForRole = (role: UserJobSpaceRole): UserJobSpacePermission[] => {
		const requiredPermissions: UserJobSpacePermission[] = [];

		switch (role) {
			case UserJobSpaceRole.developer:
				requiredPermissions.push(UserJobSpacePermission.linkDeveloper);
				break;
			case UserJobSpaceRole.manager:
				requiredPermissions.push(UserJobSpacePermission.linkManager);
				break;
			case UserJobSpaceRole.admin:
				requiredPermissions.push(UserJobSpacePermission.linkAdmin);
				break;
			default:
				break;
		}

		return requiredPermissions;
	};
}
