import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationName1731562261475 implements MigrationInterface {
  name = 'MigrationName1731562261475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`title\``);
    await queryRunner.query(
      `ALTER TABLE \`board\` ADD \`title\` varchar(25) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`title\``);
    await queryRunner.query(
      `ALTER TABLE \`board\` ADD \`title\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
  }
}
