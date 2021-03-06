import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate } from 'date-fns'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'


interface IRequest {
  provider_id: string
  month: number
  year: number
}

// Array
type IResponse = {
  day: number
  available: boolean
}

// type IResponse = Array<{
//   day: number
//   available: boolean
// }>

@injectable()
class ListProviderMonthAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}
    
  public async execute({provider_id, year, month}: IRequest): Promise<IResponse[]> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id, year, month
    })

    const numberOfDaysInMonth = getDaysInMonth( new Date(year, month - 1))

    const eachDayArray = Array.from( {length: numberOfDaysInMonth}, ( _, index ) => index + 1 )
    //console.log(eachDayArray)
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => 
        getDate(appointment.datetime) === day
      )

      return {day, available: appointmentsInDay.length < 10}
    })

    return availability
  }

}

export default ListProviderMonthAvailabilityService