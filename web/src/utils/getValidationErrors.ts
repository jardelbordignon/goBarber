import { ValidationError } from 'yup'

interface ErrorsProps {
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): ErrorsProps {
  const validationErrors: ErrorsProps = {}

  err.inner.forEach( error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors
}