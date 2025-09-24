import { Controller, Get } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
	@Get()
	async getProfile() {
		return { name: 'Bob' };
	}
}
