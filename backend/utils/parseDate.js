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
    const arrayDate = dateString.split("-").map(el => {
        const value = parseInt(el)
        if(isNaN(value)) throw new Error("Wrong Date Format")
        return value
    })
    let date;
    
    if(arrayDate[0] > 3000) {
        date = new Date(arrayDate[0] * 1000)
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60000)
    }
    else {
        arrayDate[1] = arrayDate[1] ? arrayDate[1] - 1 : 0
        date = new Date(...arrayDate)
    }


    return new Date(Date.UTC(date.getFullYear(), date.getMonth() | 0,
        date.getDate() | 0, date.getHours() | 0,
        date.getMinutes() | 0, date.getSeconds() | 0));
}