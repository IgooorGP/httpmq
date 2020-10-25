import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAckedFieldToMessageEntity1603669108894 implements MigrationInterface {
    name = 'AddAckedFieldToMessageEntity1603669108894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "acked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "acked"`);
    }

}
