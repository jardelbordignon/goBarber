import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

describe('ListProviderDayAvailability', () => { 
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    )
  })


  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 14, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 15, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => 
      new Date(2020, 4, 20, 11).getTime()
    )

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'barber',
      year: 2020,
      month: 5,
      day: 20
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8,  available: false },
      { hour: 9,  available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]))
  })

})

