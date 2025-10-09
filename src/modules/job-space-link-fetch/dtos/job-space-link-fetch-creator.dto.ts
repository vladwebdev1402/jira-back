import { ApiProperty } from '@nestjs/swagger';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';

export class JobSpaceLinkFetchCreator {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ example: 'bob@gmail.com' })
	email: string;

	@ApiProperty({
		enum: UserJobSpaceRole,
	})
	role: UserJobSpaceRole;
}
