import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1598819652702 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'varchar', //'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						//default: 'uuid_generate_v4()'
					},
					{
						name: 'name',
						type: 'varchar'
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true
					},
					{
						name: 'password',
						type: 'varchar'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP' //'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP', //'now()'
						onUpdate: 'CURRENT_TIMESTAMP'
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users')
	}

}
