import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsGuest1760032696245 implements MigrationInterface {
	name = 'AddIsGuest1760032696245';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" ADD "isGuest" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_job_space_entity" DROP COLUMN "isGuest"`);
	}
}
