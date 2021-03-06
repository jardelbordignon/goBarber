import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'


interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}
    
  public async execute({user_id}: IRequest): Promise<User[] | undefined> {
    const users = await this.repository.findAll({
      except_user_id: user_id
    })
    
    return users
  }

}

export default ListProvidersService