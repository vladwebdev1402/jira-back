import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFieldToUrl1759347902085 implements MigrationInterface {
	name = 'ChangeFieldToUrl1759347902085';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "job_space_entity" DROP COLUMN "cover"`);
		await queryRunner.query(
			`ALTER TABLE "job_space_entity" ADD "coverUrl" character varying NOT NULL DEFAULT ''`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_entity" ADD "faviconUrl" character varying NOT NULL DEFAULT ''`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "job_space_entity" DROP COLUMN "faviconUrl"`);
		await queryRunner.query(`ALTER TABLE "job_space_entity" DROP COLUMN "coverUrl"`);
		await queryRunner.query(
			`ALTER TABLE "job_space_entity" ADD "cover" character varying NOT NULL DEFAULT ''`,
		);
	}
}
