import { Controller, Post } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller()
export class ArticleController {
    constructor(
private readonly articleService: ArticleService
    ) {}
    @Post('articles')
    async create() {
        return this.articleService.createArticle();

    }
}