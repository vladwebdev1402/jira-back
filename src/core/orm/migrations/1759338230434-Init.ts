import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1759338230434 implements MigrationInterface {
	name = 'Init1759338230434';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "session_entity" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "ended" TIMESTAMP NOT NULL, "rejected" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_897bc09b92e1a7ef6b30cba4786" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "displayName" character varying NOT NULL DEFAULT '', "avatarUrl" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "post" character varying NOT NULL DEFAULT '', "company" character varying NOT NULL DEFAULT '', "department" character varying NOT NULL DEFAULT '', "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "session_entity" ADD CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "session_entity" DROP CONSTRAINT "FK_8118675718bebb455bba4caf129"`,
		);
		await queryRunner.query(`DROP TABLE "user_entity"`);
		await queryRunner.query(`DROP TABLE "session_entity"`);
	}
}
