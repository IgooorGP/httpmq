import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1602438873186 implements MigrationInterface {
    name = 'InitialMigration1602438873186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "topic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_15f634a2dbf62a79bb726fc6158" UNIQUE ("name"),
                CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "queue" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "topicId" uuid,
                CONSTRAINT "UQ_47df683d488b532dc5c3978af2b" UNIQUE ("name"),
                CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "message" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "headers" json NOT NULL,
                "message" character varying NOT NULL,
                "queueId" uuid,
                CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "queue"
            ADD CONSTRAINT "FK_b5a7bba5495d3d40745804387c7" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_2da8e09e44ad26af6aaa3e9a64e" FOREIGN KEY ("queueId") REFERENCES "queue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "message" DROP CONSTRAINT "FK_2da8e09e44ad26af6aaa3e9a64e"
        `);
        await queryRunner.query(`
            ALTER TABLE "queue" DROP CONSTRAINT "FK_b5a7bba5495d3d40745804387c7"
        `);
        await queryRunner.query(`
            DROP TABLE "message"
        `);
        await queryRunner.query(`
            DROP TABLE "queue"
        `);
        await queryRunner.query(`
            DROP TABLE "topic"
        `);
    }

}
