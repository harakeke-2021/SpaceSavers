import requestor from '../consume'

export function getUserHistoryApi (id, consume = requestor) {
  return consume(`/parker/history/${id}`, 'get')
}
