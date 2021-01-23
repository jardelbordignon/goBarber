import { Repository, getRepository, Not } from 'typeorm';

import User from '../entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO, IFindAllProvidersDto} from '@modules/users/repositories/IUserDTOs';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findAll({except_user_id}: IFindAllProvidersDto): Promise<User[] | undefined> {
    const params = except_user_id
      ? { where: { id: Not(except_user_id)} }
      : {}

    const users = await this.ormRepository.find(params)
    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })
    return user
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

}

export default UsersRepository