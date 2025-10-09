import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
	ApiPaginated,
	Pagination,
	PaginationApi,
	PaginationSwagger,
} from 'common/decorators/pagination';
import { User } from 'common/decorators/user';
import { JwtUser } from 'common/types/jwt-user';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SuccessResponse } from 'common/classes/success-response';
import { JobSpaceLinkFetchCreator } from './dtos/job-space-link-fetch-creator.dto';
import { JobSpaceLinkFetchService } from './job-space-link-fetch.service';
import { JobSpaceLinkFetchCreateDto } from './dtos/job-space-link-fetch-create.dto';
import { JobSpaceLinkFetchTarget } from './dtos/job-space-link-fetch-target.dto';

@Controller('job-space-link-fetch')
@ApiBearerAuth()
export class JobSpaceLinkFetchController {
	constructor(private jobSpaceLinkFetchService: JobSpaceLinkFetchService) {}

	@Get('/target')
	@PaginationSwagger()
	@ApiPaginated(JobSpaceLinkFetchTarget)
	async getAllAsTarget(@User() user: JwtUser, @Pagination() pagination: PaginationApi) {
		return this.jobSpaceLinkFetchService.getAllAsTarget(user.email, pagination);
	}

	@Get('/creator/:jobSpaceId')
	@PaginationSwagger()
	@ApiPaginated(JobSpaceLinkFetchCreator)
	async getAllAsCreator(
		@User() user: JwtUser,
		@Param('jobSpaceId', ParseIntPipe) jobSpaceId: number,
		@Pagination() pagination: PaginationApi,
	) {
		return this.jobSpaceLinkFetchService.getAllAsCreator(user.id, jobSpaceId, pagination);
	}

	@Post()
	@ApiResponse({ type: JobSpaceLinkFetchCreator })
	async create(@User() user: JwtUser, @Body() dto: JobSpaceLinkFetchCreateDto) {
		const { creatorUser, jobSpace, ...jobSpaceLinkFetch } =
			await this.jobSpaceLinkFetchService.create(user, dto);

		return jobSpaceLinkFetch;
	}

	@Post('/accept/:jobSpaceLinkId')
	@ApiResponse({ type: SuccessResponse })
	async accept(
		@User() user: JwtUser,
		@Param('jobSpaceLinkId', ParseIntPipe) jobSpaceLinkId: number,
	) {
		return this.jobSpaceLinkFetchService.accept(user, jobSpaceLinkId);
	}

	@Delete(':jobSpaceLinkId')
	async remove(
		@User() user: JwtUser,
		@Param('jobSpaceLinkId', ParseIntPipe) jobSpaceLinkId: number,
	) {
		return this.jobSpaceLinkFetchService.remove(user, jobSpaceLinkId);
	}
}
