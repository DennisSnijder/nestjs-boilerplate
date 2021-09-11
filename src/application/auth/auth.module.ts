import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local/local.strategy";


@Module({
    imports: [
        UserModule,
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('jwt.secret'),
                signOptions: { expiresIn: '1h' },
            }),
        })
    ],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {

}
