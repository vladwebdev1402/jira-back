import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JobSpaceCreateDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;
}
