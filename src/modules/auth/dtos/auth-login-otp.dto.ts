import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Max, Min } from 'class-validator';
import { VALIDATION_ERRORS } from 'common/constants/errors';

export class AuthLoginOtpDto {
	@ApiProperty({ example: 123456 })
	@Min(100000, { message: VALIDATION_ERRORS.validationOtp })
	@Max(999999, { message: VALIDATION_ERRORS.validationOtp })
	otp: number;

	@ApiProperty({ example: 'bob@gmail.com' })
	@IsEmail({}, { message: VALIDATION_ERRORS.validationEmail })
	email: string;
}
