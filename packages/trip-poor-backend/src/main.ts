import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
