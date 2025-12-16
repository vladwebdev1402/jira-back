import { BadRequestException, Injectable } from '@nestjs/common';
import { CLIENT_ERRORS } from 'common/constants/errors';
import { JwtUser } from 'common/types/jwt-user';
import { UserJobSpaceRepository } from 'core/orm/entities/user-job-space/user-job-space.repository';
import { JobSpaceRepository } from 'core/orm/entities/job-space/job-space.repository';
import { ChangeRoleDto } from './dtos/change-role.dto';

@Injectable()
export class UserJobSpaceService {
	constructor(
		private userJobSpaceRepository: UserJobSpaceRepository,
		private jobSpaceRepository: JobSpaceRepository,
	) {}

	async getByJobSpaceId(userId: number, jobSpaceId: number) {
		const isExistsInJobSpace = this.userJobSpaceRepository.findOne({
			where: {
				jobSpace: {
					id: jobSpaceId,
				},
				isUnlinked: false,
				user: {
					id: userId,
				},
			},
		});

		if (!isExistsInJobSpace) throw new BadRequestException(CLIENT_ERRORS.userJobSpaceNotLinked);

		return this.userJobSpaceRepository.find({
			where: {
				jobSpace: {
					id: jobSpaceId,
				},
			},
			relations: {
				user: true,
			},
			select: {
				user: {
					id: true,
					avatarUrl: true,
					name: true,
					displayName: true,
				},
			},
		});
	}

	async changeRole(fetchedUser: JwtUser, dto: ChangeRoleDto) {
		const fetchedUserLink = await this.userJobSpaceRepository.findOne({
			where: {
				user: {
					id: fetchedUser.id,
				},
				isUnlinked: false,
			},
		});

		const targetUserLink = await this.userJobSpaceRepository.findOne({
			where: {
				id: dto.userJobSpaceId,
				isUnlinked: false,
			},
		});

		if (!fetchedUserLink || !targetUserLink)
			throw new BadRequestException(CLIENT_ERRORS.userJobSpaceNotFound);

		const targetJobSpace = await this.jobSpaceRepository.findOne({
			where: {
				id: dto.jobSpaceId,
			},
		});

		if (!targetJobSpace) throw new BadRequestException(CLIENT_ERRORS.jobSpaceNotFound);

		const requiredPermissions = this.userJobSpaceRepository.getRequiredLinkPermissionsForRole(
			dto.role,
		);

		const isHavePermissions = await this.userJobSpaceRepository.havePermissions(
			requiredPermissions,
			{
				user: {
					id: fetchedUser.id,
				},
				jobSpace: {
					id: targetJobSpace.id,
				},
			},
		);

		if (!isHavePermissions) throw new BadRequestException(CLIENT_ERRORS.operationPermissions);

		await this.userJobSpaceRepository.changeRole(dto.role, {
			id: targetUserLink.id,
		});

		return { ...targetUserLink, role: dto.role };
	}

	async unlink(fetchedUser: JwtUser, targetUserJobSpaceId: number) {
		const fetchedUserLink = await this.userJobSpaceRepository.findOne({
			where: {
				user: {
					id: fetchedUser.id,
				},
				isUnlinked: false,
			},
		});

		const targetUserLink = await this.userJobSpaceRepository.findOne({
			where: {
				id: targetUserJobSpaceId,
				isUnlinked: false,
			},
		});

		if (!fetchedUserLink || !targetUserLink)
			throw new BadRequestException(CLIENT_ERRORS.userJobSpaceNotFound);

		const isHavePermission = this.userJobSpaceRepository.getRequiredLinkPermissionsForRole(
			targetUserLink.role,
		);

		if (!isHavePermission || targetUserLink.isCreator)
			throw new BadRequestException(CLIENT_ERRORS.operationPermissions);

		await this.userJobSpaceRepository.unLink({
			id: targetUserLink.id,
		});

		return { ...targetUserLink, isUnlinked: true };
	}
}
