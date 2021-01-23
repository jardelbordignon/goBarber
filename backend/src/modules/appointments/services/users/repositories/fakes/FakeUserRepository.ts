import {v4} from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO, IFindAllProvidersDto } from '@modules/users/repositories/IUserDTOs';

class FakeUserRepository implements IUsersRepository {
  
  private users: User[] = []

  public async findAll({except_user_id}: IFindAllProvidersDto): Promise<User[] | undefined> {
    let users = this.users

    if (except_user_id)
      users = this.users.filter(user => user.id !== except_user_id)

    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(userObj => userObj.id === id)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {id: v4()}, userData)

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(userObject => userObject.id === user.id)
    this.users[userIndex] = user

    return user
  }

}

export default FakeUserRepository