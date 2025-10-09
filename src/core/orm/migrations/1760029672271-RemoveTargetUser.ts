import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTargetUser1760029672271 implements MigrationInterface {
	name = 'RemoveTargetUser1760029672271';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" DROP CONSTRAINT "FK_da971bc2fb34edb6f464bf9c209"`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" RENAME COLUMN "targetUserId" TO "email"`,
		);
		await queryRunner.query(`ALTER TABLE "job_space_link_fetch_entity" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" ADD "email" character varying NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "job_space_link_fetch_entity" DROP COLUMN "email"`);
		await queryRunner.query(`ALTER TABLE "job_space_link_fetch_entity" ADD "email" integer`);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" RENAME COLUMN "email" TO "targetUserId"`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" ADD CONSTRAINT "FK_da971bc2fb34edb6f464bf9c209" FOREIGN KEY ("targetUserId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
