import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { genSalt, hash } from 'bcrypt';
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RegistrationDto } from "./dto/registration.dto";
import UserAlreadyExistsException from "./exceptions/user-already-exists.exception";


@Injectable()
export class UserService {

    public constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) {
    }

    public async findOneByEmail(email: string): Promise<User> {
        return this.repository.findOne({ where: { email }});
    }

    public async registerUser(registration: RegistrationDto): Promise<User> {
        if (await this.findOneByEmail(registration.email)) {
            throw UserAlreadyExistsException.withEmail(registration.email);
        }

        const user = new User();
        user.email = registration.email;
        user.salt = await genSalt();
        user.password = await hash(registration.password, user.salt);

        await this.repository.save(user);
        return user;
    }
}
