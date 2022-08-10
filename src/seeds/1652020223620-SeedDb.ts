import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedDb1652020223620 implements MigrationInterface {
    name = 'SeedDb1652020223620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tags (name) VALUES ('baka'), ('laziest'), ('cow')`),

        await queryRunner.query(`INSERT INTO users (username, email, password) VALUES ('baka', 'baka@baka.com', '$2b$10$D3HHp9DCtn2Aoaz/9sQKfuhRRK4VDfdxOw2PS32clNREAYDfChi76')`);

        await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article description', 'first article body', 'baka,dog', 25)`);
 
        await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article description', 'second article body', 'baka,dog', 25)`,);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
