import { IsEnum, IsNumber } from 'class-validator';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';

export class ChangeRoleDto {
	@IsNumber()
	jobSpaceId: number;

	@IsNumber()
	userJobSpaceId: number;

	@IsEnum(UserJobSpaceRole)
	role: UserJobSpaceRole;
}
