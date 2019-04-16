import { api } from '../api-client'

export const getCustomerById = async customerId => {
  const response = await api('/api/customers/' + customerId, {
    method: 'GET',
  })
  // todo process response into our customer structure
  return response
}
