import { User } from "@app/user/decorators/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto_ } from "./dto/createArticle.dto";

@Controller()
export class ArticleController {
    constructor(
private readonly articleService: ArticleService
    ) {}
    @Post('articles')
    @UseGuards(AuthGuard)
    async create(@User() currentUser: UserEntity, @Body('article') createArticleDto: CreateArticleDto_ ):
    Promise<any> {
        return this.articleService.createArticle(currentUser, createArticleDto);

    }
}