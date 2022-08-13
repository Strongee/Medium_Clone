import { FollowEntity } from "@app/user/profile/follow.entity";
import { UserEntity } from "@app/user/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleController } from "./article.controller";
import { ArticleEntity } from "./article.entity";
import { ArticleService } from "./article.service";

@Module({
 imports:[TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity])],
 providers: [ArticleService],
 controllers:[ArticleController],
 exports: []


})
export class ArticleModule {}