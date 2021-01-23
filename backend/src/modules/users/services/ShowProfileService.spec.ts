
import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import ShowProfileService from './ShowProfileService'


let fakeUserRepository: FakeUserRepository
let showProfileService: ShowProfileService

describe('UpdateProfile', () => { 
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    showProfileService = new ShowProfileService(fakeUserRepository)
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({ 
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12345'
    })

    const profile = await showProfileService.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@email.com')
  })

  
  it('should not be able show the profile from non-existing user', async () => {
    expect(
      showProfileService.execute({ user_id: 'non-existing-user '})
    ).rejects.toBeInstanceOf(AppError)
  })

})

