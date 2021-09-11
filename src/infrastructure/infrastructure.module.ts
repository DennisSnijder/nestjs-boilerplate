import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import databaseConfig from '../_config/database.config';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
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
