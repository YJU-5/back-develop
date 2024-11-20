import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1731998809227 implements MigrationInterface {
    name = 'Newmigrations1731998809227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP COLUMN \`postId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD \`postId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\` DROP COLUMN \`postId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD \`postId\` varchar(255) NOT NULL
        `);
    }

}
