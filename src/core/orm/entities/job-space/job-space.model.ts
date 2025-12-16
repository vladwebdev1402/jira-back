import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class JobSpaceModel {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ example: 'Job Space' })
	name: string;

	@ApiProperty({ example: 'https://gravatar.com/avatar' })
	coverUrl: string;

	@ApiProperty({ example: 'https://gravatar.com/avatar' })
	faviconUrl: string;

	@Exclude()
	users: unknown[];
}
