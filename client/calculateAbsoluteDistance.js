const { log10Dependencies, atan2 } = require('mathjs')
const math = require('mathjs')

const test = math.sin(math.unit(90, 'deg'))
console.log(test)

const R = 6373

const lon1 = -36.87069
const lon2 = -36.86440
const lat1 = 174.77596
const lat2 = 174.7760

const dlon = lon1 - lon2
const dlat = lat1 - lat2

const a = math.square(math.sin(dlat / 2)) + (math.cos(lat2) * math.cos(lat2) * math.square(math.sin(dlon / 2)))
const c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

const d = R * c

console.log(d)
