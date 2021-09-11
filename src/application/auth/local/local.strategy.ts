import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { User } from "../../user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService
    ) {
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string): Promise<User> {
        return await this.authService.validateUserCredentials(email, password);
    }
}
