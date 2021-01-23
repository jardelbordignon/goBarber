import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

//import configMulter from '@config/multer'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}
    
  public async execute({user_id}: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user)
      throw new AppError('Usuário não encontrado')
    
    return user
  }

}

export default ShowProfileService