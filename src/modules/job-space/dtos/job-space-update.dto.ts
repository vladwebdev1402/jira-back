import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobSpaceUpdateDto {
	@Exclude()
	id: undefined;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	coverUrl?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	faviconUrl?: string;
}
