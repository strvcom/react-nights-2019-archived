import { api } from '../api-client'
import { logIn } from '../log-in'

export const createCustomer = async ({ email, password, firstName }) => {
  const requestBody = {
    data: {
      type: 'customers',
      attributes: {
        email,
        password,
        metadata: {
          firstName,
        },
      },
    },
  }

  const response = await api('/api/customers', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })

  if (!response.errors) {
    const {
      data: { attributes },
    } = response

    const ownerId = await logIn(email, password)
    console.log(ownerId)

    return {
      email: attributes.email,
      firstName: attributes.metadata.firstName,
    }
  } else {
    const firstError = response.errors[0]
    if (firstError.status === '422') {
      throw new Error('Email is already registered')
    } else {
      throw new Error('Unexpected error')
    }
  }
}
