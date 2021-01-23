import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment'
import { ICreateAppointmentDTO } from '../repositories/IAppointmentDTOs'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import AppError from '@shared/errors/AppError'

@injectable()
export default class CreateAppointmentsService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
    
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
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
    
    const findAppointmentInSameHour = await this.appointmentRepository.findByDatetime(startHour)
    
    if( findAppointmentInSameHour )
      throw new AppError('Esse horário já foi agendado')

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      datetime: startHour
    })

    const dateFormatted = format(startHour, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: 'Novo agendamento para dia '+dateFormatted
    }) 

    return appointment

  }

}
