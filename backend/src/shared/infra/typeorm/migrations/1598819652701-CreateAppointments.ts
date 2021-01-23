import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1598819652701 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar', // 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            //default: 'uuid_generate_v4()'
          },
          {
            name: 'provider',
            type: 'varchar'

          },
          {
            name: 'datetime',
            type: 'timestamp' //'timestamp with time zone' // postgres
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
    await queryRunner.dropTable('appointments')
  }

}
