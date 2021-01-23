import { injectable, inject } from 'tsyringe'
import { getHours, isAfter } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'


interface IRequest {
  provider_id: string
  year: number
  month: number
  day: number
}

// Array
type IResponse = {
  hour: number
  available: boolean
}

@injectable()
class ListProviderDayAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}
    
  public async execute({provider_id, year, month, day}: IRequest): Promise<IResponse[]> {

    console.log(provider_id, year, month, day)
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, year, month, day
    })

    console.log(appointments)

    const hourStart = 8
    const eachHourArray = Array.from({length: 10}, (_, index) => index + hourStart)

    const currentDate = new Date(Date.now())
    
    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.datetime) === hour
      )

      const compareDate = new Date(year, month-1, day, hour) //2020-10-09 08:00:00
      // compara se não há agendamento no horário e se o horário ainda não passou
      const available = !hasAppointmentInHour && isAfter(compareDate, currentDate)
      
      return {hour, available}
    })

    return availability
  }

}

export default ListProviderDayAvailabilityService