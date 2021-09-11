import { Inject, Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import * as path from 'path';
import { SuperTest } from "supertest";


@Injectable()
export class TestUtils {

    @Inject(Connection)
    connection: Connection;

    constructor() {
        if (process.env.NODE_ENV !== 'test') {
            throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
        }
    }

    async resetDatabase() {
        return await this.connection.synchronize(true);
    }

    async loadFixtures() {
        await this.resetDatabase();

        const loader = new Loader();
        loader.load(path.resolve('./test/fixtures'));

        const resolver = new Resolver();
        const fixtures = resolver.resolve(loader.fixtureConfigs);
        const builder = new Builder(this.connection, new Parser());

        for (const fixture of fixturesIterator(fixtures)) {
            const entity = await builder.build(fixture);
            await getRepository(entity.constructor.name).save(entity);
        }
    }

    async getDefaultUserToken(request: SuperTest<any>): Promise<string> {
        const response = await request.post('/auth/login').send({
            email: 'test@snijder.io',
            password: 'test-password'
        });

        expect(response.status).toBe(201);
        expect(response.body.access_token !== undefined).toBe(true);

        return 'Bearer ' + response.body.access_token;
    }
}
