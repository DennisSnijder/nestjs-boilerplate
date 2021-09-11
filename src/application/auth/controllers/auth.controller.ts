import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from "../strategies/local/local-auth.guard";
import { AuthService } from "../auth.service";

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
}
