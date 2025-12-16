import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PaginationApi } from 'common/decorators/pagination';
import { JobSpaceLinkFetchRepository } from 'core/orm/entities/job-space-link-fetch/job-space-link-fetch.repository';
import { JobSpaceRepository } from 'core/orm/entities/job-space/job-space.repository';
import { JwtUser } from 'common/types/jwt-user';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';
import { UserJobSpaceRepository } from 'core/orm/entities/user-job-space/user-job-space.repository';
import {
	USER_JOB_SPACE_PERMISSIONS_BY_ROLE,
	UserJobSpacePermission,
} from 'common/enums/user-job-space-permission';
import { CLIENT_ERRORS } from 'common/constants/errors';
import { JobSpaceLinkFetchCreateDto } from './dtos/job-space-link-fetch-create.dto';

@Injectable()
export class JobSpaceLinkFetchService {
	constructor(
		private userJobSpaceRepository: UserJobSpaceRepository,
		private jobSpaceLinkFetchRepository: JobSpaceLinkFetchRepository,
		private jobSpaceRepository: JobSpaceRepository,
	) {}

	async getAllAsCreator(userId: number, jobSpaceId: number, pagination: PaginationApi) {
		const havePermissions = await this.userJobSpaceRepository.havePermissions(
			[UserJobSpacePermission.linkDeveloper],
			{
				jobSpace: {
					id: jobSpaceId,
				},
				user: {
					id: userId,
				},
			},
		);

		if (!havePermissions) throw new ForbiddenException(CLIENT_ERRORS.operationPermissions);

		const [data, count] = await this.jobSpaceLinkFetchRepository.findAndCount({
			where: {
				jobSpace: {
					id: jobSpaceId,
					users: {
						user: {
							id: userId,
						},
					},
				},
			},
			skip: pagination.skip,
			take: pagination.limit,
			select: {
				id: true,
				role: true,
				email: true,
			},
		});

		return { data, count };
	}

	async getAllAsTarget(email: string, pagination: PaginationApi) {
		const [data, count] = await this.jobSpaceLinkFetchRepository.findAndCount({
			where: { email },
			select: {
				id: true,
				jobSpace: {
					id: true,
					name: true,
				},
				role: true,
			},
			skip: pagination.skip,
			take: pagination.limit,
			relations: {
				jobSpace: true,
			},
		});

		return { data, count };
	}

	async create(user: JwtUser, dto: JobSpaceLinkFetchCreateDto) {
		const existUser = await this.userJobSpaceRepository.findOne({
			where: {
				user: {
					email: dto.email,
				},
				jobSpace: {
					id: dto.jobSpaceId,
					users: {
						isUnlinked: false,
					},
				},
			},
		});

		if (existUser && !existUser.isUnlinked)
			throw new BadRequestException(CLIENT_ERRORS.jobSpaceLinkFetchUserExist);

		const requiredPermissions = this.userJobSpaceRepository.getRequiredLinkPermissionsForRole(
			dto.role,
		);

		const isHavePermissions = await this.userJobSpaceRepository.havePermissions(
			requiredPermissions,
			{
				user: {
					id: user.id,
				},
				jobSpace: {
					id: dto.jobSpaceId,
				},
			},
		);

		if (!isHavePermissions) throw new ForbiddenException(CLIENT_ERRORS.operationPermissions);

		const jobSpace = await this.jobSpaceRepository.findOne({
			where: {
				id: dto.jobSpaceId,
				users: {
					user: {
						id: user.id,
					},
				},
			},
		});

		if (!jobSpace) throw new BadRequestException(CLIENT_ERRORS.jobSpaceNotFound);

		const existLink = await this.jobSpaceLinkFetchRepository.findByEmailAndJobSpaceId(
			dto.email,
			dto.jobSpaceId,
		);

		if (existLink) throw new BadRequestException(CLIENT_ERRORS.jobSpaceLinkFetchExist);

		return this.jobSpaceLinkFetchRepository.create({
			email: dto.email,
			jobSpace: {
				id: dto.jobSpaceId,
			},
			role: dto.role,
			creatorUser: {
				id: user.id,
			},
		});
	}

	async accept(user: JwtUser, linkId: number) {
		const linkFetch = await this.jobSpaceLinkFetchRepository.findOne({
			where: {
				id: linkId,
				email: user.email,
			},
			relations: {
				jobSpace: true,
			},
		});

		if (!linkFetch) throw new BadRequestException(CLIENT_ERRORS.jobSpaceLinkFetchNotFound);

		await this.jobSpaceLinkFetchRepository.remove([linkFetch]);

		await this.userJobSpaceRepository.create({
			jobSpace: {
				id: linkFetch.jobSpace.id,
			},
			role: linkFetch.role,
			permissions: USER_JOB_SPACE_PERMISSIONS_BY_ROLE[linkFetch.role],
			user: {
				id: user.id,
			},
			isUnlinked: false,
		});

		return { success: true };
	}

	async remove(user: JwtUser, linkId: number) {
		const linkFetch = await this.jobSpaceLinkFetchRepository.findOne({
			where: {
				id: linkId,
			},
			relations: {
				creatorUser: true,
				jobSpace: true,
			},
		});

		if (!linkFetch) throw new BadRequestException(CLIENT_ERRORS.jobSpaceLinkFetchNotFound);

		if (user.email === linkFetch.email) {
			await this.jobSpaceLinkFetchRepository.remove([linkFetch]);

			return { success: true };
		}

		const requiredPermissions: UserJobSpacePermission[] = [];

		if (linkFetch.role === UserJobSpaceRole.developer)
			requiredPermissions.push(UserJobSpacePermission.linkDeveloper);
		if (linkFetch.role === UserJobSpaceRole.manager)
			requiredPermissions.push(UserJobSpacePermission.linkManager);
		if (linkFetch.role === UserJobSpaceRole.admin)
			requiredPermissions.push(UserJobSpacePermission.linkAdmin);

		const userJobSpace = await this.userJobSpaceRepository.havePermissions(requiredPermissions, {
			jobSpace: {
				id: linkFetch.jobSpace.id,
			},
			user: {
				id: user.id,
			},
		});

		if (!userJobSpace) throw new ForbiddenException(CLIENT_ERRORS.operationPermissions);

		await this.jobSpaceLinkFetchRepository.remove([linkFetch]);

		return { success: true };
	}
}
