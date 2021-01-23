
export interface ICreateUserDTO {
  name: string
  email: string
  password: string
}

export interface IUpdateAvatarDTO {
  user_id: string
  filename: string
}

export interface IFindAllProvidersDto {
  except_user_id?: string;
}