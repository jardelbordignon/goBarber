import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'

import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import UserAvatarsServices from './UserAvatarsServices'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

let fakeRespository: FakeUserRepository
let fakeStorageProvider: FakeStorageProvider
let userAvatarService: UserAvatarsServices

describe('UsersAvatar', () => { 
  beforeEach(() => {
    fakeRespository = new FakeUserRepository()
    fakeStorageProvider = new FakeStorageProvider()
    userAvatarService = new UserAvatarsServices(fakeRespository, fakeStorageProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await fakeRespository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    await userAvatarService.updateAvatar({user_id: user.id, filename: 'teste.jpg'})

    expect(user.avatar).toBe('teste.jpg')
  })


  it('should not be able to update avatar from non existing user', async () => {
    const update = userAvatarService.updateAvatar({
      user_id: 'non-existing-user', filename: 'teste.jpg'
    })

    await expect(update).rejects.toBeInstanceOf(AppError)
  })


  it('should delete old avatar when updating', async () => {
    // jest irá observar se a função será chamada
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeRespository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    await userAvatarService.updateAvatar({user_id: user.id, filename: 'teste.jpg'})
    await userAvatarService.updateAvatar({user_id: user.id, filename: 'teste2.jpg'})

    expect(deleteFile).toHaveBeenCalledWith('teste.jpg')
    expect(user.avatar).toBe('teste2.jpg')
  })

})

