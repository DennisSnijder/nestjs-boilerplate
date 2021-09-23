import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TokenGenerator } from 'ts-token-generator';
import { User } from "@app/user/user.entity";

@Entity()
export class RefreshToken {

    @PrimaryColumn()
    token: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    expiryDate: Date;

    constructor(user: User) {
        const tokenGenerator = new TokenGenerator({ bitSize: 1024 });
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 168); //valid for 1 week

        this.expiryDate = expiryDate;
        this.token = tokenGenerator.generate();
        this.user = user;
    }

}
