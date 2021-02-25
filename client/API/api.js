import request from 'superagent'

export function getGeoCode (address) {
  request.post('/')
    .send(address)
    .then(res => res)
    .catch((err) => {
      const errMessage = err.response?.body?.error?.title
      throw new Error(errMessage || err.message)
    })
}
