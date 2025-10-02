import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJobSpace1759346798877 implements MigrationInterface {
	name = 'AddJobSpace1759346798877';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "job_space_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cover" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_ac7cb01488275f73e7b29c9e0db" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."user_job_space_entity_permissions_enum" AS ENUM('EDIT_JOB_SPACE', 'DELETE_JOB_SPACE', 'CREATE_PROJECT', 'DELETE_PROJECT', 'RECOVERY_PROJECT', 'LINK_DEVELOPER', 'LINK_MANAGER', 'LINK_ADMIN')`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."user_job_space_entity_role_enum" AS ENUM('admin', 'manager', 'developer')`,
		);
		await queryRunner.query(
			`CREATE TABLE "user_job_space_entity" ("id" SERIAL NOT NULL, "isUnlinked" boolean NOT NULL DEFAULT false, "permissions" "public"."user_job_space_entity_permissions_enum" array NOT NULL DEFAULT '{}', "role" "public"."user_job_space_entity_role_enum" NOT NULL DEFAULT 'developer', "userId" integer, "jobSpaceId" integer, CONSTRAINT "PK_ded89a91fd9015607d15644237c" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" ADD CONSTRAINT "FK_1bc3929af141ed51f817310ce0a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" ADD CONSTRAINT "FK_27bb93fbe8c7bb07f41f4e590cb" FOREIGN KEY ("jobSpaceId") REFERENCES "job_space_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" DROP CONSTRAINT "FK_27bb93fbe8c7bb07f41f4e590cb"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_job_space_entity" DROP CONSTRAINT "FK_1bc3929af141ed51f817310ce0a"`,
		);
		await queryRunner.query(`DROP TABLE "user_job_space_entity"`);
		await queryRunner.query(`DROP TYPE "public"."user_job_space_entity_role_enum"`);
		await queryRunner.query(`DROP TYPE "public"."user_job_space_entity_permissions_enum"`);
		await queryRunner.query(`DROP TABLE "job_space_entity"`);
	}
}
