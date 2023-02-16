/**
 * @file Utility functions for numbers
 * @author Ugo Balducci
 * @version 1.0.0
 */

/**
 * Returns an array of numbers from start to end
 * @param {Number} start The start of the range
 * @param {Number} end The end of the range
 * @param {Number} step The step of the range
 * @return {Array} The array of numbers
 */
exports.range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }

    for (let i = start; i <= end; i += step) {
      output.push(i);
    }
    return output;
  };