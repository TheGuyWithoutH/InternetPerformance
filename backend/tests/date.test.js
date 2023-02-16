/**
 * @file Tests for the date parsing function
 * @author Ugo Balducci
 * @version 1.0.0
 */

const parseDate = require("../utils/parseDate")

describe('Date tests', () =>  {

    test('Empty date return an error', () => {
        expect(() => parseDate()).toThrow()
    })

    test('Date works with Timestamp', () => {
        //Sun, 10th February 2002 17:00 GMT
        expect(parseDate("1013360400").toUTCString()).toBe(new Date(1013360400000).toUTCString())
    })
    
    test('Date works with date string', () => {
        //Sun, 10th February 2002 00:00 GMT
        expect(parseDate("2002-02-10").toUTCString()).toBe(new Date(1013299200000).toUTCString())
    })
    
    test('Date works with date string without day', () => {
        //Fri, 1st February 2002 00:00 GMT
        expect(parseDate("2002-02").toUTCString()).toBe(new Date(1012521600000).toUTCString())
    })
    
    test('Date works with year only', () => {
        //Tue, 1st January 2002 00:00 GMT
        expect(parseDate("2002").toUTCString()).toBe(new Date(1009843200000).toUTCString())
    })
    
    test('Wrong formatting returns an error', () => {
        expect(() => parseDate("Sun, 10 Feb 2002")).toThrow(Error)
    })


})