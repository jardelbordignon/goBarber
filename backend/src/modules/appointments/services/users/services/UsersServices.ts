import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import { ICreateUserDTO } from '@modules/users/repositories/IUserDTOs'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'


@injectable()
class UsersServices {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async find(): Promise<User[] | undefined> {
    return this.repository.findAll({})
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {

    const userExists = await this.repository.findByEmail(email)

    if (userExists)
      throw new AppError('Esse e-mail já foi registrado')

    const hashedPassword = await this.hashProvider.generateHash(password)
    
    const user = await this.repository.create({ name, email, password: hashedPassword })

    //delete user.password

    return user
  }


}

export default UsersServices