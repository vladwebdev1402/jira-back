import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber } from 'class-validator';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';

export class JobSpaceLinkFetchCreateDto {
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsNumber()
	@ApiProperty()
	jobSpaceId: number;

	@IsEnum(UserJobSpaceRole)
	@ApiProperty()
	role: UserJobSpaceRole;
}
