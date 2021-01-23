import { startOfHour, isBefore, getHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment'
import { ICreateAppointmentDTO } from '../repositories/IAppointmentDTOs'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import AppError from '@shared/errors/AppError'

@injectable()
export default class CreateAppointmentsService {

  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository
  ){}

  public async execute({ provider_id, user_id, datetime }: ICreateAppointmentDTO): Promise<Appointment> {

    const startHour = startOfHour( datetime )
    // console.log(startHour)
    // console.log( Date.now())

    if (isBefore(startHour, Date.now()))
      throw new AppError('Não é possível fazer um agendamento em uma data passada')
    
    if (user_id === provider_id)
      throw new AppError('Não é possível fazer um agendamento consigo')
          
    if (getHours(startHour) < 8 || getHours(startHour) > 17)
      throw new AppError('Não é possível fazer um agendamento fora do horário comercial')
    
    const findAppointmentInSameHour = await this.repository.findByDatetime(startHour)
    
    console.log(findAppointmentInSameHour)
    if( findAppointmentInSameHour )
      throw new AppError('Esse horário já foi agendado')

    const Appointment = this.repository.create({ provider_id, user_id, datetime: startHour })

    return Appointment
  }

}
