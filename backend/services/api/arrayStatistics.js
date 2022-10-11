/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */


exports.sum = (array) => {
    return array.reduce((p, n) => p + n, 0)
}

/**
 * 
 * @param {Array} array 
 */
exports.mean = (array) => {
    return this.sum(array) / array.length
}

exports.standardDeviavtion = (array) => {
    const mean = this.mean(array)
    const variance = array.reduce((p, n) => p + n - mean, 0) / array.length
    return Math.sqrt(variance)
}

exports.quantile = (array, percent) => {
    const newArray = sort(array)
    const mid = array.length * percent
    return mid % 1 ? newArray[Math.floor(mid)] : (newArray[mid + 1] + newArray[mid]) / 2 
}

exports.median = (array) => {
    return this.quantile(array, 0.5)
}

exports.Q1 = (array) => {
    return this.quantile(array, .25)
}

exports.Q3 = (array) => {
    return this.quantile(array, .75)
}

const sort = (array) => {
    const newArray = [...array]
    return newArray.sort((a, b) => a - b)
}