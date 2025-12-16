import { ApiProperty } from '@nestjs/swagger';

export class EntityWithEmail {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ example: 'bob@gmail.com' })
	email: string;
}
