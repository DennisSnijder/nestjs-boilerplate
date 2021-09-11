import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { RegistrationController } from "./controllers/registration.controller";
import { UserController } from "./controllers/user.controller";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [RegistrationController, UserController],
})
export class UserModule {
}
