
import { sign } from 'jsonwebtoken'

import configAuthentication from '@config/authentication'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import { injectable, inject } from 'tsyringe'

interface ISessionsProps {
  email: string
  password: string
}

interface ISessionResponse {
  user: User
  token: string
}

@injectable()
class SessionsServices {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    
    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}

  public async create({ email, password }: ISessionsProps): Promise<ISessionResponse> {

    const user = await this.repository.findByEmail(email)

    if (!user) 
      throw new AppError('Incorrect Email/Password validation.', 401)

    //console.log(Object.entries(user))

    // password - não criptografada
    // user.password - criptografada
    const checkPassword = await this.hashProvider.compareHash(password, user.password)

    if (!checkPassword) {
      throw new AppError('E-mail e/ou senha inválidos', 401)
    }

    const { secret, expiresIn } = configAuthentication.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })
  
    //delete user.password

    return {user, token}
  }

}

export default SessionsServices