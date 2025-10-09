import { ApiProperty } from '@nestjs/swagger';
import { EntityWithName } from 'common/classes/entity-with-name';
import { UserJobSpaceRole } from 'common/enums/user-job-space-role';

export class JobSpaceLinkFetchTarget {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ enum: UserJobSpaceRole })
	role: UserJobSpaceRole;

	@ApiProperty({ type: EntityWithName })
	jobSpace: EntityWithName;
}
