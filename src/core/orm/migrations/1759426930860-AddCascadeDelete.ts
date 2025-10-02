import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeDelete1759426930860 implements MigrationInterface {
	name = 'AddCascadeDelete1759426930860';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" DROP CONSTRAINT "FK_27bb93fbe8c7bb07f41f4e590cb"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" ADD CONSTRAINT "FK_27bb93fbe8c7bb07f41f4e590cb" FOREIGN KEY ("jobSpaceId") REFERENCES "job_space_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" DROP CONSTRAINT "FK_27bb93fbe8c7bb07f41f4e590cb"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" ADD CONSTRAINT "FK_27bb93fbe8c7bb07f41f4e590cb" FOREIGN KEY ("jobSpaceId") REFERENCES "job_space_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
