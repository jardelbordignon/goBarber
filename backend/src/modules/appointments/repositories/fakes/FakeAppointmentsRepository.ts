import { v4 } from 'uuid'
import { isEqual, getDate, getMonth, getYear } from 'date-fns'

import Appointment from '../../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { 
  ICreateAppointmentDTO, 
  IFindAllInMouthFromProviderDTO,
  IFindAllInDayFromProviderDTO
} from './../IAppointmentDTOs'

export default class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public findAll(): Appointment[] {
    return this.appointments
  }

  public async findByDatetime(datetime: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => isEqual(appointment.datetime, datetime))
  }

  
  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMouthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => (
      appointment.provider_id === provider_id &&
      getMonth(appointment.datetime) + 1 === month &&
      getYear(appointment.datetime) === year
    ))

    //const listAppointments = appointments.map(appoint => ({"day": getDate(appoint.datetime), "available": true}) )

    return appointments
  }


  public async findAllInDayFromProvider({ provider_id, year, month, day}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => (
      appointment.provider_id === provider_id &&
      getDate(appointment.datetime) === day &&
      getMonth(appointment.datetime) + 1 === month &&
      getYear(appointment.datetime) === year
    ))

    return appointments
  }
  

  public async create({ provider_id, user_id, datetime }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()
    // appointment.id = v4()
    // appointment.datetime = datetime
    // appointment.provider_id = provider_id
    Object.assign(appointment, { id: v4(), provider_id, user_id, datetime })

    this.appointments.push(appointment)

    return appointment
  }
}

