/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

module.exports = (dateString) => {
    const arrayDate = dateString.split("-")
    
    if(arrayDate[0].length > 4) return new Date(parseInt(arrayDate[0])*1000)
    else if (arrayDate.length == 1) return new Date(arrayDate[0], 1)
    else return new Date(dateString)
}