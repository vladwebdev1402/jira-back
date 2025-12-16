import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { User } from 'common/decorators/user';
import { JwtUser } from 'common/types/jwt-user';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserJobSpaceService } from './user-job-space.service';
import { ChangeRoleDto } from './dtos/change-role.dto';

@Controller('user-job-space')
@ApiBearerAuth()
export class UserJobSpaceController {
	constructor(private userJobSpaceService: UserJobSpaceService) {}

	@Get('/:jobSpaceId')
	async getByJobSpaceId(
		@User() user: JwtUser,
		@Param('jobSpaceId', ParseIntPipe) jobSpaceId: number,
	) {
		return this.userJobSpaceService.getByJobSpaceId(user.id, jobSpaceId);
	}

	@Patch('/role')
	async changeRole(@User() user: JwtUser, @Body() dto: ChangeRoleDto) {
		return this.userJobSpaceService.changeRole(user, dto);
	}

	@Delete('/unlink/:userJobSpaceId')
	async unlink(
		@User() user: JwtUser,
		@Param('userJobSpaceId', ParseIntPipe) userJobSpaceId: number,
	) {
		return this.userJobSpaceService.unlink(user, userJobSpaceId);
	}
}
