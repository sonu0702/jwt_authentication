import {MigrationInterface, QueryRunner} from "typeorm";

export class user1672044165749 implements MigrationInterface {
    name = 'user1672044165749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "user_uuid" character varying NOT NULL,
                "image" character varying,
                "email" character varying,
                "name" character varying,
                "password" character varying,
                "city" character varying,
                "additional_data" jsonb NOT NULL DEFAULT '{}',
                "is_email_verified" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_5832c6d9b84363dc2525015d46c" UNIQUE ("user_uuid"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
