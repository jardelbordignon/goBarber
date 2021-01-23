//import { uuid } from 'uuidv4'
//import { v4 } from "uuid"
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn
 } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

/** no ormconfig.json
 * "strictPropertyInitialization": false,
 * "experimentalDecorators": true,
 * "emitDecoratorMetadata": true,
 */

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string // coluna no banco de dados

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User // relacionamento no javascript

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  //@Column('time with time zone') // postgress
  @Column('timestamp')
  datetime: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // constructor( {provider, datetime}: Omit<Appointment, 'id'> ) {
  //   this.id = v4()
  //   this.provider = provider
  //   this.datetime = datetime
  // }
}

export default Appointment