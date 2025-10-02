import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
	ApiPaginated,
	Pagination,
	PaginationApi,
	PaginationSwagger,
} from 'common/decorators/pagination';
import { User } from 'common/decorators/user';
import { JwtUser } from 'common/types/jwt-user';
import { JobSpaceModel } from 'core/orm/entities/job-space/job-space.model';
import { plainToClass } from 'class-transformer';
import { SuccessResponse } from 'common/classes/success-response';
import { JobSpaceService } from './job-space.service';
import { JobSpaceCreateDto } from './dtos/job-space-create.dto';
import { JobSpaceUpdateDto } from './dtos/job-space-update.dto';

@Controller('/job-space')
@ApiBearerAuth()
export class JobSpaceController {
	constructor(private jobSpaceService: JobSpaceService) {}

	@Get('/list')
	@PaginationSwagger()
	@ApiPaginated(JobSpaceModel)
	async findAll(@User() user: JwtUser, @Pagination() pagination: PaginationApi) {
		return this.jobSpaceService.findAll(user.id, pagination);
	}

	@Post()
	@ApiResponse({ type: JobSpaceModel })
	async create(@User() user: JwtUser, @Body() dto: JobSpaceCreateDto) {
		return this.jobSpaceService.create(user.id, dto);
	}

	@Patch(':id')
	@ApiResponse({ type: JobSpaceModel })
	async update(
		@User() user: JwtUser,
		@Body() dto: JobSpaceUpdateDto,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.jobSpaceService.update(id, user.id, plainToClass(JobSpaceUpdateDto, dto));
	}

	@Delete(':id')
	@ApiResponse({ type: SuccessResponse })
	async delete(@User() user: JwtUser, @Param('id', ParseIntPipe) id: number) {
		return this.jobSpaceService.delete(id, user.id);
	}
}
