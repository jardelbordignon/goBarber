import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

//import configMulter from '@config/multer'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateProfileService {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}
    
  public async execute({user_id, name, email, password, old_password}: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user)
      throw new AppError('Usuário não encontrado')

    const userWithUpdatedEmail = await this.repository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id)
      throw new AppError('Esse e-mail já está em uso')
    
    user.name = name
    user.email = email

    if (password && !old_password)
      throw new AppError('Você precisa informar a senha anterior para inserir uma nova.')
    
    if (password && old_password){
      if( !(await this.hashProvider.compareHash(old_password, user.password)))
        throw new AppError('Senha anterior não confere')
    }

    if (password)
      user.password = await this.hashProvider.generateHash(password)
    
    return this.repository.save(user)
  }

}

export default UpdateProfileService