interface ITemplateVariables {
  [key: string]: string | number
}

export default interface IParceMailTemplateDTO {
  //template: string
  file: string // forgot_password.hbs
  variables: ITemplateVariables
}