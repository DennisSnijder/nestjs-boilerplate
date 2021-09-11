import { Module } from '@nestjs/common';
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    InfrastructureModule,

    // Application modules
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
