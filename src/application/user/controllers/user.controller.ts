import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../infrastructure/decorators/current-user.decorator";
import { User } from "../user.entity";
import { JwtAuthGuard } from "@app/auth/strategies/jwt/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    @Get()
    getCurrentLoggedInUser(@CurrentUser() user: User) {
        return user;
    }

}
