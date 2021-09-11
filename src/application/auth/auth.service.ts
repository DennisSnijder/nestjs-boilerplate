import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare as comparePasswordAndHash } from 'bcrypt';
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    public async validateUserCredentials(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);

        if(!user) {
            throw new UnauthorizedException("User not found");
        }

        if(await comparePasswordAndHash(password, user.password) === false) {
            throw new UnauthorizedException("Incorrect password");
        }

        return user;
    }

    public async login(user: User) {
        const payload = { email: user.email, sub: user.id };

        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload),
        };
    }
}
