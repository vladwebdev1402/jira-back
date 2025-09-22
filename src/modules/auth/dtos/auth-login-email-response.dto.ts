import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginEmailResponseDto {
	@ApiProperty({ example: 100000 })
	timeout: number;
}
