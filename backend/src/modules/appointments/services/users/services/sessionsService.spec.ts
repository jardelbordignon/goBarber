import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import SessionsServices from './SessionsServices'
import UsersServices from './UsersServices'

let fakeRespository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let userService: UsersServices
let sessionService: SessionsServices

describe('Sessions', () => { // describe para agrupar os testes
  beforeEach(() => {
    fakeRespository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    userService = new UsersServices(fakeRespository, fakeHashProvider)
    sessionService = new SessionsServices(fakeRespository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {
    await userService.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    const response = await sessionService.create({
      email: 'johndoe@email.com',
      password: '12345'
    })

    expect(response).toHaveProperty('token')
  })


  it('should not be able to authenticate with wrong password', async () => {
    await userService.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    await expect(
      sessionService.create({
        email: 'johndoe@email.com',
        password: 'wrong-pass'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to authenticate with non existing user', async () => {
    const sessionService = new SessionsServices(fakeRespository, fakeHashProvider)

    await expect(
      sessionService.create({ 
        email: 'johndoe@email.com',
        password: '12345'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})

