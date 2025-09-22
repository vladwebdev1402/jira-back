import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { VALIDATION_ERRORS } from 'common/constants/errors';

export class AuthLoginEmailDto {
	@ApiProperty({ example: 'bob@gmail.com' })
	@IsEmail({}, { message: VALIDATION_ERRORS.validationEmail })
	email: string;
}
