import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddUserIdToAppointments1604935830061 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('appointments', new TableColumn({
			name: 'user_id',
			type: 'varchar',
			isNullable: true
    }))
    
		await queryRunner.createForeignKey('appointments', new TableForeignKey({
			name: 'FK_appointments_user',
			columnNames: ['user_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users',
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'FK_appointments_user')
		await queryRunner.dropColumn('appointments', 'user_id')
	}

}
