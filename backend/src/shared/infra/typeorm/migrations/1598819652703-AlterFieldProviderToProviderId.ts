import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterFieldProviderToProviderId1598819652703 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'provider')
		await queryRunner.addColumn('appointments', new TableColumn({
			name: 'provider_id',
			type: 'varchar',
			isNullable: true
		}))
		await queryRunner.createForeignKey('appointments', new TableForeignKey({
			name: 'FK_appointments_provider',
			columnNames: ['provider_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users',
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'FK_appointments_provider')
		await queryRunner.dropColumn('appointments', 'provider_id')
		await queryRunner.addColumn('appointments', new TableColumn({
			name: 'provider',
			type: 'varchar'
		}))
	}

}
