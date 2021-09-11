import { IsAscii, IsEmail, MinLength } from 'class-validator';

export class RegistrationDto {

    @IsEmail()
    @MinLength(1)
    email: string;

    @IsAscii()
    @MinLength(8)
    password: string;
}
