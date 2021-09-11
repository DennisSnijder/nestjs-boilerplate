import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from "../../../user/user.service";
import { User } from "../../../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        private userService: UserService,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret'),
        });
    }

    async validate(payload: any): Promise<User> {
        return await this.userService.findOneByEmail(payload.email);
    }
}
