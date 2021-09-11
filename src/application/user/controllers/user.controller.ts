import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/strategies/jwt/jwt-auth.guard";
import { CurrentUser } from "../../../infrastructure/decorators/current-user.decorator";
import { User } from "../user.entity";


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    @Get()
    getCurrentLoggedInUser(@CurrentUser() user: User) {
        return user;
    }

}
