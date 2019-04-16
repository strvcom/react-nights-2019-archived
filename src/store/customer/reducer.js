import { SET_CUSTOMER } from './actions'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CUSTOMER:
      return action.payload
    default:
      return state
  }
}

export default reducer
