import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('profile')
@ApiBearerAuth()
export class ProfileController {
	@Get()
	async getProfile() {
		return { name: 'Bob' };
	}
}
