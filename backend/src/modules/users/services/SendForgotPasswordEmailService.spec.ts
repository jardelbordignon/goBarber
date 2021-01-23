import AppError from '@shared/errors/AppError'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

let fakeUserRepository: FakeUserRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => { // describe para agrupar os testes
  //afterAll
  //afterEach
  //beforeAll
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider()
    fakeUserRepository = new FakeUserRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    
    
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeMailProvider
    )
  })


  it('should be able to recover the password by email', async () => {
    
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    })
    
    await sendForgotPasswordEmailService.execute({email: 'johndoe@email.com'})
    
    expect(sendMail).toHaveBeenCalled()
  })
  
  it('should not be able to recover a non-existing user password', async () => {    
    expect(sendForgotPasswordEmailService.execute({email: 'johndoe@email.com'}))
    .rejects.toBeInstanceOf(AppError)
  })
    
  it('should generate a forgot password token', async () => {
    const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    })

    await sendForgotPasswordEmailService.execute({
      email: user.email
    })

    expect(generatedToken).toHaveBeenCalledWith(user.id)
  })
})

