import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local/local.strategy";
import { JwtStrategy } from "./strategies/jwt/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshToken } from "./entities/refresh-token.entity";


@Module({
    imports: [
        UserModule,
        ConfigModule,
        PassportModule,
        TypeOrmModule.forFeature([RefreshToken]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('jwt.secret'),
                signOptions: { expiresIn: '1h' },
            }),
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {

}
