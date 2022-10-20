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
    Preconditions(array)
    return array.reduce((p, n) => p + n, 0)
}

/**
 * Gives the mean of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The mean of the array
 */
exports.mean = (array) => {
    Preconditions(array)
    return this.sum(array) / array.length
}

/**
 * Gives the standard deviation of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The standard deviation of the array
 */
exports.standardDeviation = (array) => {
    Preconditions(array)
    const mean = this.mean(array)
    let variance

    if(mean === Number.POSITIVE_INFINITY) {
        variance = array.every(elem => elem === Number.POSITIVE_INFINITY) ? 0 : Number.POSITIVE_INFINITY
    } else {
        variance = array.reduce((p, n) =>  p + (n - mean)**2, 0) / array.length
    }

    return Math.sqrt(variance)
}

/**
 * Gives the {percent}% quantile of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @param {Number} percent 
 * @returns {Number} The n% quantile of the array
 */
exports.quantile = (array, percent) => {
    Preconditions(array)
    const newArray = sort(array)
    const mid = array.length * percent
    return mid % 1 ? newArray[Math.floor(mid)] : (newArray[mid] + newArray[mid - 1]) / 2 
}

/**
 * Gives the median of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The median of the array
 */
exports.median = (array) => {
    Preconditions(array)
    return this.quantile(array, 0.5)
}

/**
 * Gives the 1st quantile of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The 1st quartile of the array
 */
exports.Q1 = (array) => {
    Preconditions(array)
    return this.quantile(array, .25)
}

/**
 * Gives the 3rd quantile of an array of numbers
 * @param {Array<Number>} array The array to analyze
 * @returns {Number} The 3rd quartile of the array
 */
exports.Q3 = (array) => {
    Preconditions(array)
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

/**
 * Basic checks for validity of an array for statistics
 * @param {Array} array the array to analyze
 * @throws {Error} An error if array is empty or contains invalid numbers
 */
const Preconditions = (array) => {
    if(array.length === 0) throw new Error("Empty Array")
    if(array.find(x => isNaN(x))) throw new Error("Array contains invalid members")
}