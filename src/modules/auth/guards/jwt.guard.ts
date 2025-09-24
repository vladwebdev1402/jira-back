import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from 'common/decorators/public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

		if (isPublic) return true;

		return super.canActivate(context);
	}
}
