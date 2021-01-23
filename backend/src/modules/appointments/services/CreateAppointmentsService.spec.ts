import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import AppError from '@shared/errors/AppError'
import CreateAppointmentsService from './CreateAppointmentsService'

let fakeRespository: FakeAppointmentRepository
let createAppointmentsService: CreateAppointmentsService

describe('Appointments', () => { // describe para agrupar os testes
  beforeEach(() => {
    fakeRespository = new FakeAppointmentRepository()
    createAppointmentsService = new CreateAppointmentsService(fakeRespository)
  })


  it('should be able to create an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => 
      new Date(2020, 10, 10, 12).getTime()
    )
    const appointment = await createAppointmentsService.execute({ 
      provider_id: 'barber1', user_id: 'client1', datetime: new Date(2020, 10, 10, 13)
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('barber1')
  })


  // it('should not be able to create two appointments on the same hour', async () => {
  //   //const datetime = new Date()

  //   await createAppointmentsService.execute({ 
  //     provider_id: 'barber1', user_id: 'client1', datetime: new Date(2020, 10, 10, 13)
  //   })

  //   await expect(
  //     createAppointmentsService.execute({ 
  //       provider_id: 'barber1', user_id: 'client2', datetime: new Date(2020, 10, 10, 13)
  //     })
  //   ).rejects.toBeInstanceOf(AppError)
  // })


  it('should not be able to create an appointment on a past date', async () => {
    // forçando o jest usar uma data/hora já passada
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 10, 12).getTime()
    })

    await expect(
      createAppointmentsService.execute({
        datetime: new Date(2020, 10, 10, 10),
        provider_id: 'barber',
        user_id: 'client'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to create an appointment before 8:00 and after 17:00', async () => {
    await expect(
      createAppointmentsService.execute({
        datetime: new Date(2020, 10, 10, 7),
        provider_id: 'barber',
        user_id: 'client'
      })
    ).rejects.toBeInstanceOf(AppError)
    
    await expect(
      createAppointmentsService.execute({
        datetime: new Date(2020, 10, 10, 18),
        provider_id: 'barber',
        user_id: 'client'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
