export function dateParser (time) {
  const millis = time * 1000
  const date = new Date(millis)
  return ` ${date.toTimeString().slice(0, 5)} ${date.toLocaleDateString()}`
}
