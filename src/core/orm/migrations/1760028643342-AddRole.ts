import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRole1760028643342 implements MigrationInterface {
	name = 'AddRole1760028643342';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."job_space_link_fetch_entity_role_enum" AS ENUM('admin', 'manager', 'developer')`,
		);
		await queryRunner.query(
			`ALTER TABLE "job_space_link_fetch_entity" ADD "role" "public"."job_space_link_fetch_entity_role_enum" NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "job_space_link_fetch_entity" DROP COLUMN "role"`);
		await queryRunner.query(`DROP TYPE "public"."job_space_link_fetch_entity_role_enum"`);
	}
}
