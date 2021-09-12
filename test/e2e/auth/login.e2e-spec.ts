import { INestApplication } from '@nestjs/common';
import { SuperTest } from 'supertest';
import * as supertest from 'supertest';
import { TestUtils } from '../test.utils';
import createTestApp from '../app';

describe('Login e2e test', () => {

    let app: INestApplication;
    let request: SuperTest<any>;
    let testingUtil: TestUtils;

    beforeAll(async () => {
        app = await createTestApp();

        testingUtil = app.get<TestUtils>(TestUtils);
        request = supertest(app.getHttpServer());
    });

    beforeEach(async () => {
        await testingUtil.loadFixtures();
    })

    test('Login user', async () => {
        const response = await request.post('/auth/login').send({
            email: 'test@snijder.io',
            password: 'test-password',
        });

        expect(response.status).toBe(201);
        expect(response.body.access_token !== undefined).toBe(true);
        expect(response.body.refresh_token !== undefined).toBe(true);
    });

    test('Invalid password login', async () => {
        const response = await request.post('/auth/login').send({
            email: 'test@snijder.io',
            password: 'invalid-password',
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });

    test('Login User & refresh token', async () => {
        const loginResponse = await request.post('/auth/login').send({
            email: 'test@snijder.io',
            password: 'test-password',
        });

        expect(loginResponse.status).toBe(201);
        expect(loginResponse.body.refresh_token !== undefined).toBe(true);

        const response = await request.post('/auth/refresh').send({
            refresh_token: loginResponse.body.refresh_token,
        });

        expect(response.status).toBe(201);
        expect(response.body.access_token !== undefined).toBe(true);
        expect(response.body.refresh_token !== undefined).toBe(true);
    });

    test('Invalid refresh token', async () => {
        const response = await request.post('/auth/refresh').send({
            refresh_token: 'invalid-refresh-token',
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });
});
