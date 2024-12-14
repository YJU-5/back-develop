import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1734057159442 implements MigrationInterface {
    name = 'Newmigrations1734057159442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`local_semester\` (
                \`id\` varchar(36) NOT NULL,
                \`title\` varchar(25) NOT NULL,
                \`content\` text NOT NULL,
                \`imageUrl\` text NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`userId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`team_member\` (
                \`id\` varchar(36) NOT NULL,
                \`title\` varchar(25) NOT NULL,
                \`age\` int NOT NULL,
                \`major\` varchar(255) NOT NULL,
                \`content\` text NOT NULL,
                \`imageUrl\` text NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`comment\` (
                \`id\` varchar(36) NOT NULL,
                \`content\` text NOT NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`postId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`board\` (
                \`id\` varchar(36) NOT NULL,
                \`title\` varchar(25) NOT NULL,
                \`content\` text NOT NULL,
                \`imageUrl\` text NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`local_semester\`
            ADD CONSTRAINT \`FK_f60940b859e107d93d605eb35e7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE \`local_semester\` DROP FOREIGN KEY \`FK_f60940b859e107d93d605eb35e7\`
        `);
        await queryRunner.query(`
            DROP TABLE \`board\`
        `);
        await queryRunner.query(`
            DROP TABLE \`comment\`
        `);
        await queryRunner.query(`
            DROP TABLE \`team_member\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`local_semester\`
        `);
    }

}
