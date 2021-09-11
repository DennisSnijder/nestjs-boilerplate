import { BadRequestException } from "@nestjs/common";

export default class UserAlreadyExistsException extends BadRequestException {
    public static withEmail(email: string) {
        return new UserAlreadyExistsException(`User with email: ${email} already exists.`);
    }
}
