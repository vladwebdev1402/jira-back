import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'core/orm/entities/user/user.model';

export class AuthLoginResponseDto extends UserModel {
	@ApiProperty({ example: 'token' })
	accessToken: string;
}
