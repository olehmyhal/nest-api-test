import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1653481198652 implements MigrationInterface {
  name = 'SeedDb1653481198652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
