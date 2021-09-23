import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import databaseConfig from '@config/database.config';
import jwtConfig from '@config/jwt.config';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig, jwtConfig],
        }),

        //database module
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
    ]
})
export class InfrastructureModule {
}
