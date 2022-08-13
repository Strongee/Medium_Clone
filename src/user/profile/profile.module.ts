import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { FollowEntity } from "./follow.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule{}