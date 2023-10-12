import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trip Poor Backend API Document')
    .setDescription('Trip Poor Backend API Document')
    .setVersion('0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(``);
  console.log(``);
  console.log(
    `     ${process.env.NODE_ENV} Server Start in Port ${process.env.PORT}`,
  );
  console.log(``);
  console.log(``);

  await app.listen(process.env.PORT);
}
bootstrap();
