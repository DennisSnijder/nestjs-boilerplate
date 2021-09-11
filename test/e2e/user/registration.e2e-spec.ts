import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { SuperTest } from 'supertest';
import createTestApp from '../app';

describe('Registration e2e test', () => {

    let app: INestApplication;
    let request: SuperTest<any>;

    beforeAll(async () => {
        app = await createTestApp();
        request = supertest(app.getHttpServer());
    });

    test('Register new user', async () => {
        const response = await request.post('/register').send({
            email: 'registration-test@snijder.io',
            password: 'testpassword123',
        });

        expect(response.status).toBe(201);
        expect(response.body.email).toBe('registration-test@snijder.io');
        expect(response.body.password).toBeUndefined();
        expect(response.body.salt).toBeUndefined();
    });
});
