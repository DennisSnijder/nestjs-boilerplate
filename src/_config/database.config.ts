import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
    if (process.env.NODE_ENV === 'test') {
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            autoLoadEntities: true,
        };
    }

    return {
        type: 'postgres',
        port: 5432,
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        autoLoadEntities: true,
    };
});
