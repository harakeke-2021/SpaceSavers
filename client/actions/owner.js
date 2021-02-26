import { getOwnerBalance } from '../api/ownerHelper'

export const GET_BALANCE = 'GET_BALANCE'

export function updateOwnerBalance(dispatch) {
  getOwnerBalance().then((result) => {
    const balance = result.body.balance
    dispatch({
      type: GET_BALANCE,
      balance
    })
    return null
  })
}
