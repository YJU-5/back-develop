import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1733877263223 implements MigrationInterface {
    name = 'Newmigrations1733877263223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`test\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`test\`
        `);
    }

}
