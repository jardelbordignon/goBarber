
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import UpdateProfileService from './UpdateProfileService'


let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateProfile', () => { 
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    const updatedProfile = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@email.com'
    })

    expect(updatedProfile.name).toBe('John Trê')
    expect(updatedProfile.email).toBe('johntre@email.com')
  })


  it('should not be able update the profile from non-existing user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'Test',
        email: 'test@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
  
  
  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    const user = await fakeUserRepository.create({ 
      name: 'Test',
      email: 'test@email.com',
      password: '12345'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John',
        email: 'johndoe@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      old_password: '12345',
      password: 'abc@123'
    })
    
    expect(updatedUser.password).toBe('abc@123')
  })


  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'abc@123'
    })).rejects.toBeInstanceOf(AppError)
  })
  
  
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      old_password: 'wrong-old-password',
      password: 'abc@123'
    })).rejects.toBeInstanceOf(AppError)
  })

})

