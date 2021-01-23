import User from '@modules/users/infra/typeorm/entities/User'
import { ICreateUserDTO, IFindAllProvidersDto } from './IUserDTOs'


export default interface IUsersRepository {

  findAll(data: IFindAllProvidersDto): Promise<User[] | undefined>

  findById(id: string): Promise<User | undefined>

  findByEmail(email: string): Promise<User | undefined>

  create(user: ICreateUserDTO): Promise<User>

  save(user: User): Promise<User>

}