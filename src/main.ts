import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { initSwagger } from 'app.swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
	});

	app.useGlobalPipes(new ValidationPipe());

	app.use(cookieParser());

	initSwagger(app);

	await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
