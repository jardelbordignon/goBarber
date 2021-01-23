import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'

export default class ResetPasswordController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body

    console.log( password, token)
    
    const resetPasswordService = container.resolve(ResetPasswordService)

    await resetPasswordService.execute({ password, token })
  
    return res.status(204).json()
  }

}