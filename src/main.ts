import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./application/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  //global interceptors
  app.useGlobalInterceptors(
      new ClassSerializerInterceptor(
          app.get(Reflector)
      )
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
