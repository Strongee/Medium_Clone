import { UserEntity } from "@app/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { ArticleEntity } from "./article.entity";
import { CreateArticleDto_ } from "./dto/createArticle.dto";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";


@Injectable() 
  export class ArticleService {
    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {}
      async createArticle(currentUser: UserEntity, createArticleDto: CreateArticleDto_):
      Promise<ArticleEntity> {
     const article = new ArticleEntity()
     Object.assign(article, createArticleDto);

     if (!article.tagList){
        article.tagList = [];
     }
     
     article.slug = this.getSlug(createArticleDto.title)

     article.id = currentUser.id /* because article id are not assign automaticaly  */ + (Math.random() * Math.pow(36, 6) | 0);   /* because article.id = userId  */
     article.author = currentUser;

     return await this.articleRepository.save(article);

      }

      async findBySlug(slug: string): Promise<ArticleEntity> {
        return await this.articleRepository.findOne({ slug })
      }

      async findAll(currentUserId: number, query: any): Promise<ArticlesResponseInterface> {
        const queryBuilder = getRepository(ArticleEntity)
        .createQueryBuilder('articles')
        .leftJoinAndSelect('articles.author', 'author')

        queryBuilder.orderBy('articles.createdAt', 'DESC')

        const articles = await queryBuilder.getMany();
        const articlesCount = await queryBuilder.getCount();

        return { articles, articlesCount,  }
      }

      async deleteArticle(slug: string, currentUserId: number): Promise<DeleteResult> {
        const article = await this.findBySlug(slug)

        if(!article){
          throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
        }

        if(article.author.id !== currentUserId){
          throw new HttpException('You a not an author', HttpStatus.FORBIDDEN)
        }
        console.log('article', article)
        return await this.articleRepository.delete({ slug })
      }

      async updateArticle(slug: string, updateArticleDto: CreateArticleDto_ ,currentUserId: number):
       Promise<ArticleEntity> {
       const article = await this.findBySlug(slug)

        if(!article){
          throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
        }

        if(article.author.id !== currentUserId){
          throw new HttpException('You a not an author', HttpStatus.FORBIDDEN)
        }
          Object.assign(article, updateArticleDto)
          return await this.articleRepository.save(article);
      }

      buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article };
      }
      private getSlug( title: string): string {
        return slugify(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
      }
  }