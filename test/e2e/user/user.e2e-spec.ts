import { INestApplication } from '@nestjs/common';
import { SuperTest } from 'supertest';
import { TestUtils } from '../test.utils';
import * as supertest from 'supertest';
import createTestApp from "../app";

describe('User controller', () => {
    let app: INestApplication;
    let request: SuperTest<any>;
    let testingUtil: TestUtils;

    let userToken: string;

    beforeAll(async () => {
        app = await createTestApp();
        request = supertest(app.getHttpServer());
        testingUtil = app.get<TestUtils>(TestUtils);
    });

    beforeEach(async () => {
        await testingUtil.loadFixtures();
        userToken = await testingUtil.getDefaultUserToken(request);
    });

    afterAll(async () => {
        await Promise.all([app.close()]);
    });

    test('Get logged in user',async () => {
        const response = await request.get('/user')
            .set('Authorization', userToken)
            .send();

        expect(response.status).toBe(200);

        expect(response.body.id).toBeDefined();
        expect(response.body.email).toBeDefined();

        expect(response.body.password).toBeUndefined();
        expect(response.body.salt).toBeUndefined();
    });
});
