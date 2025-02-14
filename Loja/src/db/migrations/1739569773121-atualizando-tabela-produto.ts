import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizandoTabelaProduto1739569773121 implements MigrationInterface {
    name = 'AtualizandoTabelaProduto1739569773121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidade_disponivel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade_disponivel" TO "quantidade"`);
    }

}
