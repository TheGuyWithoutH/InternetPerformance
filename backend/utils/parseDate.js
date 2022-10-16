/**
 * @file Provide a Date Parser to transform strings into Javascript Dates
 * @author Ugo Balducci
 * @version 1.0.0
 */

/**
 * Get Javascript Date from a string
 * @param {string} dateString The date string to parse in UTC timezone
 * @returns {Date} Javascript Date in UTC timezone
 */
module.exports = (dateString) => {
    const arrayDate = dateString.split("-")
    
    if(arrayDate[0].length > 4) return new Date(parseInt(arrayDate[0])*1000)
    else if (arrayDate.length == 1) return new Date(Date.UTC(parseInt(arrayDate[0])))
    else return new Date(dateString)
}