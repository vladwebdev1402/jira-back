import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'common/enums/user-role';

export class UserModel {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ example: 'Bob' })
	name: string;

	@ApiProperty({ example: 'BobDev' })
	displayName: string;

	@ApiProperty({ example: 'https://gravatar.com/avatar' })
	avatar: string;

	@ApiProperty({ example: 'bob@email.com' })
	email: string;

	@ApiProperty({ example: 'Developer' })
	post: string;

	@ApiProperty({ example: 'Google' })
	company: string;

	@ApiProperty({ example: 'YouTubeDevs' })
	department: string;

	@ApiProperty({ enum: UserRole, example: UserRole.User })
	role: UserRole;
}
