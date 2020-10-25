import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeMessageToJsonType1603635653043 implements MigrationInterface {
    name = 'ChangeMessageToJsonType1603635653043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "message" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "message" character varying NOT NULL`);
    }

}
