import { object, string } from 'yup'

export const schema = object().shape({
  email: string()
    .email('Email is not valid')
    .required('Email is required'),
  password: string()
    .min(6, 'Password is too short')
    .max(30, 'Password is too long')
    .required('Password is required'),
})
