import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsCreator1759350087994 implements MigrationInterface {
	name = 'AddIsCreator1759350087994';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" ADD "isCreator" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_job_space_entity" DROP COLUMN "isCreator"`);
	}
}
