import { Request, Response } from 'express'
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService'

class AppointmentController {

  public async create(req: Request, res: Response): Promise<Response> {
    console.log('CHEGOU AQUI')

    const user_id = req.user.id
    const { provider_id, datetime } = req.body

    console.log(user_id, provider_id, datetime)

    const stringToDate = parseISO(datetime)

    //console.log('parseada: '+stringToDate)

    const services = container.resolve(CreateAppointmentsService)
    
    const Appointment = await services.execute({ provider_id, user_id, datetime: stringToDate })
    //const Appointment = await services.create({ provider_id, user_id, datetime })

    return res.json(Appointment)
  }

}

export default AppointmentController