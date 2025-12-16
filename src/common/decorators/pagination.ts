import { applyDecorators, createParamDecorator, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { isEnum, isInt, isNotEmpty, isNumber, isPositive, isString, max } from 'class-validator';
import { Request } from 'express';

export enum SortOrder {
	ASC = 'ASC',
	asc = 'asc',
	DESC = 'DESC',
	desc = 'desc',
	empty = '',
}

export type PaginationApi = {
	page: number;
	limit: number;
	sortBy: string;
	sortOrder: SortOrder;
	skip: number;
	order: Record<string, SortOrder>;
};

export type PaginationParams = {
	defaultLimit?: number;
	defaultPage?: number;
	defaultSortBy?: string;
	defaultSortOrder?: SortOrder;
};

export type PaginationSwaggerParams = {
	withLimit?: boolean;
	withPage?: boolean;
	withSortBy?: boolean;
	withSortOrder?: boolean;
};

export const PaginationSwagger = (params?: PaginationSwaggerParams) => {
	const {
		withPage = true,
		withLimit = true,
		withSortBy = false,
		withSortOrder = false,
	} = params || {};

	const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

	withPage &&
		decorators.push(
			ApiQuery({
				name: 'page',
				required: false,
				type: Number,
				description: 'Page number (starting from 1)',
				example: 1,
			}),
		);

	withLimit &&
		decorators.push(
			ApiQuery({
				name: 'limit',
				required: false,
				type: Number,
				description: 'Number of items per page',
				example: 10,
			}),
		);

	withSortBy &&
		decorators.push(
			ApiQuery({
				name: 'sortBy',
				required: false,
				type: String,
				description: 'Field by sorting',
				example: '',
			}),
		);

	withSortOrder &&
		decorators.push(
			ApiQuery({
				name: 'sortOrder',
				required: false,
				enum: SortOrder,
				description: 'Value of sort order',
				example: '',
			}),
		);

	return applyDecorators(...decorators);
};

export const ApiPaginated = <TModel extends Type<unknown>>(model: TModel) =>
	applyDecorators(
		ApiExtraModels(model),
		ApiOkResponse({
			schema: {
				allOf: [
					{
						properties: {
							data: {
								type: 'array',
								items: { $ref: getSchemaPath(model) },
							},
							count: {
								type: 'number',
								example: 1,
							},
						},
					},
				],
			},
		}),
	);

export const Paginated = <TModel extends Type<unknown>>(model: TModel) => ({
	allOf: [
		{
			properties: {
				data: {
					type: 'array',
					items: { $ref: getSchemaPath(model) },
				},
				count: {
					type: 'number',
					example: 1,
				},
			},
		},
	],
});

export const Pagination = createParamDecorator((params, ctx) => {
	const request: Request = ctx.switchToHttp().getRequest();

	const pagination: PaginationApi = {
		limit: params?.defaultLimit ?? 10,
		page: params?.defaultPage ?? 1,
		sortBy: '',
		sortOrder: SortOrder.empty,
		skip: 0,
		order: {},
	};

	const { sortBy, sortOrder } = request.query;

	const limit = Number(request.query.limit);

	const page = Number(request.query.page);

	if (isNumber(limit) && isPositive(limit) && isInt(limit) && max(limit, 100))
		pagination.limit = limit;

	if (isNumber(page) && isPositive(page) && isInt(page)) pagination.page = page;

	if (isString(sortBy) && isNotEmpty(sortBy)) pagination.sortBy = sortBy;

	if (isEnum(sortOrder, SortOrder) && isNotEmpty(sortOrder))
		pagination.sortOrder = sortOrder as SortOrder;

	pagination.skip = (pagination.page - 1) * pagination.limit;

	if (pagination.sortBy && pagination.order)
		pagination.order = { [pagination.sortBy]: pagination.sortOrder };

	return pagination;
});
