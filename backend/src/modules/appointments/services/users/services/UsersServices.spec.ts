import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import UsersServices from './UsersServices'

let fakeRespository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let service: UsersServices

describe('Users', () => { // describe para agrupar os testes
  beforeEach(() => {
    fakeRespository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    service = new UsersServices(fakeRespository, fakeHashProvider)
  })


  it('should be able to list all users', async () => {
    const fakeRespository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const service = new UsersServices(fakeRespository, fakeHashProvider)

    const users = await service.find()

    expect(users).toEqual([] as User[])
  })


  it('should be able to create a new user', async () => {
    const user = await service.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    expect(user).toHaveProperty('id')
    expect(user).toEqual(user)
  })

  
  it('should not be able to create a new user with an existent email', async () => {
    await service.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    await expect(service.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })).rejects.toBeInstanceOf(AppError)
  })

})

