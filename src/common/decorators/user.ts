import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from 'common/types/jwt-user';
import { Request } from 'express';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<Request>();

	return request.user as JwtUser;
});
