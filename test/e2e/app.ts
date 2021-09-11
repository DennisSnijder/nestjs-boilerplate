import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TestUtils } from './test.utils';
import { AppModule } from "../../src/application/app.module";


async function createTestApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        providers: [TestUtils]
    }).compile();

    const app = moduleFixture.createNestApplication();

    //global pipes
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    //global interceptors
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(
            app.get(Reflector),
        ),
    );

    await app.init();
    return app;
}

export default createTestApp;
