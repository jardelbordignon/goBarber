import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => { 
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    )
  })


  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 8, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 9, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 10, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 11, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 12, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 13, 0, 0)
    })

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

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 16, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 17, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'barber',
      user_id: 'client',
      datetime: new Date(2020, 4, 20, 18, 0, 0)
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'barber',
      year: 2020,
      month: 5
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, available: true },
      { day: 20, available: false },
      { day: 21, available: true },

    ]))
  })

})

