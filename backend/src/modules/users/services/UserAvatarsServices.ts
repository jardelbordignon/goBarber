//import path from 'path'
//import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import { IUpdateAvatarDTO } from '@modules/users/repositories/IUserDTOs'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

//import configMulter from '@config/multer'
import AppError from '@shared/errors/AppError'


@injectable()
class UserAvatarsServices {

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
    
  public async updateAvatar({ user_id, filename }: IUpdateAvatarDTO): Promise<User> {
    
    const user = await this.repository.findById(user_id)
    
    if (!user)
    throw new AppError('Usuário não encontrado para alterar a imagem', 401)
    
    if (user.avatar)
      await this.storageProvider.deleteFile(user.avatar)
    
    const avatarFileName = await this.storageProvider.saveFile(filename)

    user.avatar = avatarFileName

    await this.repository.save(user)

    return user
  }


}

export default UserAvatarsServices