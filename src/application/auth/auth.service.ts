import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare as comparePasswordAndHash } from 'bcrypt';
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { RefreshToken } from "./entities/refresh-token.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(RefreshToken) private readonly refreshTokenRepository: Repository<RefreshToken>
    ) {
    }

    public async validateUserCredentials(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        if (await comparePasswordAndHash(password, user.password) === false) {
            throw new UnauthorizedException("Incorrect password");
        }

        return user;
    }

    public async login(user: User) {
        const payload = { email: user.email, sub: user.id };

        const refreshToken = new RefreshToken(user);
        await this.refreshTokenRepository.save(refreshToken);

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refreshToken.token
        };
    }

    public async validateRefreshToken(token: string): Promise<RefreshToken> {
        const refreshToken = await this.refreshTokenRepository.findOne(token, { relations: ['user'] });

        if (!refreshToken) {
            throw new UnauthorizedException('Invalid refresh token.');
        }

        if (refreshToken.expiryDate < new Date()) {
            throw new UnauthorizedException('Refresh token expired.');
        }

        return refreshToken;
    }

    public async invalidateRefreshToken(token: RefreshToken): Promise<void> {
        await this.refreshTokenRepository.remove(token);
    }
}
