import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780673744382 implements MigrationInterface {
    name = 'Migration1780673744382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Content" ALTER COLUMN "ageRecommendation" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Content" ALTER COLUMN "ageRecommendation" SET NOT NULL`);
    }

}
