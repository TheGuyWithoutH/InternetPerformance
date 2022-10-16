/**
 * @file Useful statistics on number arrays.
 * @author Ugo Balducci
 * @version 1.0.0
 */

/**
 * Sums all the elements of an array
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The sum of the array
 */
exports.sum = (array) => {
    return array.reduce((p, n) => p + n, 0)
}

/**
 * Gives the mean of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The mean of the array
 */
exports.mean = (array) => {
    return this.sum(array) / array.length
}

/**
 * Gives the standard deviation of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The standard deviation of the array
 */
exports.standardDeviavtion = (array) => {
    const mean = this.mean(array)
    const variance = array.reduce((p, n) => p + n - mean, 0) / array.length
    return Math.sqrt(variance)
}

/**
 * Gives the {percent}% quantile of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @param {*} percent 
 * @returns {Number} The n% quantile of the array
 */
exports.quantile = (array, percent) => {
    const newArray = sort(array)
    const mid = array.length * percent
    return mid % 1 ? newArray[Math.floor(mid)] : (newArray[mid + 1] + newArray[mid]) / 2 
}

/**
 * Gives the median of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The median of the array
 */
exports.median = (array) => {
    return this.quantile(array, 0.5)
}

/**
 * Gives the 1st quantile of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The 1st quartile of the array
 */
exports.Q1 = (array) => {
    return this.quantile(array, .25)
}

/**
 * Gives the 3rd quantile of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The 3rd quartile of the array
 */
exports.Q3 = (array) => {
    return this.quantile(array, .75)
}


/* ________________________________________________________________________________________________________________ */

/**
 * Sorts an array of numbers
 * @param {Array<Number>} array The array to sort
 * @returns {Array<Number>} The sorted array
 */
const sort = (array) => {
    const newArray = [...array]
    return newArray.sort((a, b) => a - b)
}