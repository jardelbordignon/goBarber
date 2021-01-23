import { Request, Response } from 'express'
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService'

class AppointmentController {

  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id
    const { provider_id, datetime } = req.body

    const stringToDate = parseISO(datetime)

    const service = container.resolve(CreateAppointmentsService)
    
    const appointment = await service.execute({
      provider_id,
      user_id,
      datetime: stringToDate
    })

    return res.json(appointment)
  }

}

export default AppointmentController