import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../user.service";
import { RegistrationDto } from "../dto/registration.dto";
import { User } from "../user.entity";


@Controller('register')
export class RegistrationController {

    public constructor(
        private userService: UserService
    ) {
    }

    @Post()
    handleRegistrationRequest(@Body() registrationDto: RegistrationDto): Promise<User> {
        return this.userService.registerUser(registrationDto);
    }
}
