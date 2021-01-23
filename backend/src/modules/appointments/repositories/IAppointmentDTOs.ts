export interface ICreateAppointmentDTO {
  provider_id: string
  user_id: string
  datetime: Date
}

export interface IFindAllInMouthFromProviderDTO {
  provider_id: string
  month: number
  year: number
}

export interface IFindAllInDayFromProviderDTO {
  provider_id: string
  year: number
  month: number
  day: number
}