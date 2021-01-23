import Appointment from '../infra/typeorm/entities/Appointment';
import {
  ICreateAppointmentDTO,
  IFindAllInMouthFromProviderDTO,
  IFindAllInDayFromProviderDTO
} from './IAppointmentDTOs'

export default interface IAppointmentsRepository {

  create(data: ICreateAppointmentDTO): Promise<Appointment>

  findByDatetime(datetime: Date): Promise<Appointment | undefined>

  findAllInMonthFromProvider(data: IFindAllInMouthFromProviderDTO): Promise<Appointment[]>

  findAllInDayFromProvider(data: IFindAllInMouthFromProviderDTO): Promise<Appointment[]>

  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>

 //findAll(): Appointment[]

}