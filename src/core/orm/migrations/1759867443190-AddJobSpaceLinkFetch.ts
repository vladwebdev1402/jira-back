import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJobSpaceLinkFetch1759867443190 implements MigrationInterface {
	name = 'AddJobSpaceLinkFetch1759867443190';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "job_space_link_fetch_entity" ("id" SERIAL NOT NULL, "creatorUserId" integer, "targetUserId" integer, "jobSpaceId" integer, CONSTRAINT "PK_8e43466b06f5c1432f9c2257063" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" ADD CONSTRAINT "FK_286795bf318ebdad1b9942f32b8" FOREIGN KEY ("creatorUserId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" ADD CONSTRAINT "FK_da971bc2fb34edb6f464bf9c209" FOREIGN KEY ("targetUserId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" ADD CONSTRAINT "FK_28f1cbf8848548707b2003ba7c8" FOREIGN KEY ("jobSpaceId") REFERENCES "job_space_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" DROP CONSTRAINT "FK_28f1cbf8848548707b2003ba7c8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" DROP CONSTRAINT "FK_da971bc2fb34edb6f464bf9c209"`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" DROP CONSTRAINT "FK_286795bf318ebdad1b9942f32b8"`,
		);
		await queryRunner.query(`DROP TABLE "job_space_link_fetch_entity"`);
	}
}
