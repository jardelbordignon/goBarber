import { Repository, getRepository, Raw } from 'typeorm';

import Appointment from '../entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { 
  ICreateAppointmentDTO, 
  IFindAllInMouthFromProviderDTO,
  IFindAllInDayFromProviderDTO
} from '../../../repositories/IAppointmentDTOs';


class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDatetime(datetime: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({ where: { datetime } })
    
    return appointment
  }

  public async findAllInMonthFromProvider({ provider_id, year, month }: IFindAllInMouthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0') // se não tiver dois digitos preenche com zero a esquerda

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        datetime: Raw(
          datetimeFieldName => {
            //return `to_char(${datetimeFieldName}, 'MM-YYYY = ${parseMonth}-${year}')` // postres
            return `date_format(${datetimeFieldName}, 'MM-YYYY = ${parseMonth}-${year}')`
          }
        )
      }      
    })

    return appointments
  }

  public async findAllInDayFromProvider({ provider_id, year, month, day}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0') // se não tiver dois digitos preenche com zero a esquerda
    const parseDay = String(day).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        datetime: Raw(
          datetimeFieldName => {
            //return `to_char(${datetimeFieldName}, 'DD-MM-YYYY = ${parseDay}-${parseMonth}-${year}')` // postgres
            return `date_format(${datetimeFieldName}, 'DD-MM-YYYY = ${parseDay}-${parseMonth}-${year}')`
          }
        )
      }      
    })

    return appointments
  }

  public async create({ provider_id, user_id, datetime }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, user_id, datetime })

    await this.ormRepository.save(appointment)

    return appointment
  }

}

export default AppointmentsRepository