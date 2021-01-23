
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowProfileService from '@modules/users/services/ShowProfileService'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'

export default class ProfileController {


  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id
    const service = container.resolve(ShowProfileService)

    const user = await service.execute({ user_id })

    //delete user.password

    return res.json(user)
  }


  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id

    const { name, email, old_password, password } = req.body

    console.log(name, email, old_password, password)
  
    const service = container.resolve(UpdateProfileService)
  
    const user = await service.execute({user_id, name, email, old_password, password})
    
    //delete user.password

    return res.json(user)
  }

}