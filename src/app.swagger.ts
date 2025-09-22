import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('JIRA API')
		.setDescription('The Jira API description')
		.setVersion('1.0')
		.addBearerAuth()
		.addServer('/')
		.addServer('/api')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory);
};
