import { Module } from '@nestjs/common';
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    InfrastructureModule,

    // Application modules
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
