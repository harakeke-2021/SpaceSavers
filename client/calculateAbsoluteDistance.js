const math = require('mathjs')

const R = 6373

const lon1 = -36.87069
const lon2 = -36.86440
const lat1 = 174.77596
const lat2 = 174.7760

const dlon = lon1 - lon2
const dlat = lat1 - lat2

const a = math.square(math.sin(math.unit(dlat / 2, 'deg'))) + (math.cos(math.unit(lat2, 'deg')) * math.cos(math.unit(lat2, 'deg')) * math.square(math.sin(math.unit(dlon / 2, 'deg'))))
const c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

const d = R * c

console.log(d)

function calculateAbsoluteDistance (lon1, lon2, lat1, lat2) {

}
