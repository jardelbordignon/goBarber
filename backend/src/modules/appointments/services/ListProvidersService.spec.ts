
import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import ListProvidersService from './ListProvidersService'



let fakeUserRepository: FakeUserRepository
let listProvidersService: ListProvidersService

describe('ListProvidersService', () => { 
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    listProvidersService = new ListProvidersService(fakeUserRepository)
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    const user2 = await fakeUserRepository.create({ 
      name: 'John Trê',
      email: 'johntre@email.com',
      password: '12345'
    })

    const loggedUser = await fakeUserRepository.create({ 
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: '12345'
    })

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([user1, user2])
  })


})

