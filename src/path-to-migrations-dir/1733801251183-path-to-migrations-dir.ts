import { MigrationInterface, QueryRunner } from "typeorm";

export class PathToMigrationsDir1733801251183 implements MigrationInterface {
    name = 'PathToMigrationsDir1733801251183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`local_semester\`
            ADD \`userId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\` DROP COLUMN \`content\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\`
            ADD \`content\` text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\`
            ADD CONSTRAINT \`FK_f60940b859e107d93d605eb35e7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`local_semester\` DROP FOREIGN KEY \`FK_f60940b859e107d93d605eb35e7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\` DROP COLUMN \`content\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\`
            ADD \`content\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\` DROP COLUMN \`userId\`
        `);
    }

}
