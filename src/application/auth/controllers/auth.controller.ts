import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from "../strategies/local/local-auth.guard";
import { AuthService } from "../auth.service";
import { RefreshTokenDto } from "../dto/refresh-token.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    public async refresh(@Body() req: RefreshTokenDto) {
        const refreshToken = await this.authService.validateRefreshToken(req.refresh_token);
        await this.authService.invalidateRefreshToken(refreshToken);

        return this.authService.login(refreshToken.user);
    }
}
