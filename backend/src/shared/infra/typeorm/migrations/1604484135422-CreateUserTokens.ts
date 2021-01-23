import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUserTokens1604484135422 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar', //'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            //default: 'uuid_generate_v4()'
          },
          {
            name: 'token',
            type: 'varchar', //'uuid',
            generationStrategy: 'uuid',
            //default: 'uuid_generate_v4()'
          },
          {
              name: 'user_id',
              type: 'varchar', //'uuid'
          },
          {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
          },
          {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
          }
        ],
        
        foreignKeys: [
          {
            name: 'fkTokenUsers',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens')
  }

}
