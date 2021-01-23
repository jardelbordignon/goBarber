import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderAppointmentsService: ListProviderAppointmentsService

describe('ListProviderDayAvailability', () => { 
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository
    )
  })


  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 14, 0, 0)
    })

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 15, 0, 0)
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'barber',
      year: 2020,
      month: 5,
      day: 20
    })

    expect(appointments).toEqual([appointment1, appointment2])
  })

})

