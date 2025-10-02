import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, In, Repository } from 'typeorm';
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
		const userJobSpace = await this.repository.findOne({
			where: {
				...where,
				permissions: In(permissions),
			},
		});

		if (!userJobSpace) return false;

		return true;
	}

	async changeRole(role: UserJobSpaceRole, where: FindOptionsWhere<UserJobSpaceEntity>) {
		return this.repository.update(where, {
			role,
			permissions: USER_JOB_SPACE_PERMISSIONS_BY_ROLE[role],
		});
	}
}
