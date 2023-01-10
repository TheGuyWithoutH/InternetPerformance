/**
 * @file Manage the configuration and connection to Mongoose
 * @author Ugo Balducci
 * @version 1.0.0
*/

const loadtest = require('loadtest');
const fs = require('fs');

let logs = ""

function writeLog(message) {
    console.log(message)
    logs += message + "\n"
}

function statusCallback(latency, result, error) {
}

const testEnd = (message, next) => (error, result) => {
    if (error) {
        writeLog('Got an error: %s', error);
    } else {
        writeLog("\n==============================\n");
        writeLog(message + "\n")
        writeLog("\nTotal Requests : " + result.totalRequests);
        writeLog("Total Failures : " + result.totalErrors);
        writeLog("Requests/Second : " + result.rps);
        writeLog("Requests/Hour : " + (result.rps * 3600));
        writeLog("Avg Request Time : " + result.meanLatencyMs);
        writeLog("Min Request Time : " + result.minLatencyMs);
        writeLog("Max Request Time : " + result.maxLatencyMs);
        writeLog("Percentiles : " + JSON.stringify(result.percentiles,  null, 1));
        writeLog("\n===============================\n")
        next()
    }
}

writeLog("\n==============================\n");
writeLog("Test of API Performance")
writeLog("\n==============================\n")


/////////////////////////////////////////////////////////////////////
//////////////////////////TESTS SPATIAL API//////////////////////////
/////////////////////////////////////////////////////////////////////


//Test the Spatial API endpoint with 5000 requests for city Paris

loadtest.loadTest({
    url: 'http://localhost:3000/api/query/spatial?city=Paris',
    maxRequests: 500,
    concurrency: 50,
    method: 'GET',
    contentType: 'application/json',
    statusCallback: statusCallback
}, testEnd("Test of the Spatial endpoint for Paris", spatialTest2));

//Test the Spatial API endpoint with 500 requests for country Brasil

function spatialTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/spatial?country=Brasil',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Spatial API endpoint for Brasil", spatialTest3));
}


//Test the Spatial API endpoint with 500 requests for country USA and city New York

function spatialTest3() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/spatial?country=United%20States&city=New%20York',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Spatial API endpoint for New York and country USA", spatialTest4));
}


/////////////////////////////////////////////////////////////////////

//Test the Spatial API endpoint with 500 requests for country USA and city New York from 2022-06-01 to 2022-06-12

function spatialTest4() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/spatial?country=United%20States&city=New%20York&from=2022-06-01&to=2022-06-12',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Spatial API endpoint for country USA and city New York from 2022-06-01 to 2022-06-12", spatialTest5));
}

/////////////////////////////////////////////////////////////////////


//Test the Spatial API endpoint with 500 requests for country USA and city New York until 2022-05-12 with latencies only

function spatialTest5() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/spatial?country=United%20States&city=New%20York&to=2022-05-12&latencyOnly=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Spatial API endpoint for country USA and city New York until 2022-05-12 with latencies only", spatialTest6));
}

/////////////////////////////////////////////////////////////////////

//Test the Spatial API endpoint with 500 requests for country USA and city New York from 2022-05-20 to 2022-06-12 with stream ids

function spatialTest6() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/spatial?country=United%20States&city=New%20York&from=2022-05-20&to=2022-06-12&streamId=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Spatial API endpoint for country USA and city New York from 2022-05-20 to 2022-06-12 with stream ids", timeTest1));
}


/////////////////////////////////////////////////////////////////////
///////////////////////////TESTS TIME API////////////////////////////
/////////////////////////////////////////////////////////////////////


//Test the Time API endpoint with 500 requests from 2022-06-11 to 2022-06-12

function timeTest1() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/time?from=2022-06-11&to=2022-06-12',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Time API endpoint from 2022-06-11 to 2022-06-12", timeTest2));
}


//Test the Time API endpoint with 500 requests from 2022-06-11 to 2022-06-12 with latencies only

function timeTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/time?from=2022-06-11&to=2022-06-12&latencyOnly=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Time API endpoint from 2022-06-11 to 2022-06-12 with latencies only", timeTest3));
}


//Test the Time API endpoint with 500 requests from 2022-06-11 to 2022-06-12 with stream ids

function timeTest3() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/time?from=2022-06-11&to=2022-06-12&streamId=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Time API endpoint from 2022-06-11 to 2022-06-12 with stream ids", userTest1));
}


/////////////////////////////////////////////////////////////////////
///////////////////////////TESTS USER API////////////////////////////
/////////////////////////////////////////////////////////////////////


// Test the User API endpoint with 500 requests for user id "44f9fbe41529e57a4119a6756b57b84e7d267c1c" from Le Mans

function userTest1() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/user?id=44f9fbe41529e57a4119a6756b57b84e7d267c1c',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the User API endpoint for a user at Le Mans", userTest2));
}


// Test the User API endpoint with 500 requests for user id "44f9fbe41529e57a4119a6756b57b84e7d267c1c" from Le Mans with latencies only

function userTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/user?id=44f9fbe41529e57a4119a6756b57b84e7d267c1c&la&latencyOnly=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the User API endpoint for a user at Le Mans with latencies only", userTest3));
}


// Test the User API endpoint with 500 requests for user id "44f9fbe41529e57a4119a6756b57b84e7d267c1c" from Le Mans with stream ids

function userTest3() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/user?id=44f9fbe41529e57a4119a6756b57b84e7d267c1c&la&streamId=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the User API endpoint for a user at Le Mans with stream ids", streamTest1));
}


/////////////////////////////////////////////////////////////////////
//////////////////////////TESTS STREAM API///////////////////////////
/////////////////////////////////////////////////////////////////////


// Test the Stream API endpoint with 500 requests for stream id "50b636d573fe850d812eac83be181d976502e014"

function streamTest1() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/stream?id=50b636d573fe850d812eac83be181d976502e014',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Stream API endpoint for a stream", streamTest2));
}


// Test the Stream API endpoint with 500 requests for stream id "50b636d573fe850d812eac83be181d976502e014" with latencies only

function streamTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/stream?id=50b636d573fe850d812eac83be181d976502e014&latencyOnly=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Stream API endpoint for a stream with latencies only", streamTest3));
}


// Test the Stream API endpoint with 500 requests for stream id "50b636d573fe850d812eac83be181d976502e014" with stream ids

function streamTest3() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/query/stream?id=50b636d573fe850d812eac83be181d976502e014&streamId=on',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Stream API endpoint for a stream with stream ids", timeframeTest1));
}


/////////////////////////////////////////////////////////////////////
////////////////////////TESTS TIMEFRAME API//////////////////////////
/////////////////////////////////////////////////////////////////////

// Test the Timeframe API endpoint with 5000 requests for timeframe of 1 day from 2022-04-16 to 2022-05-03 at New York

function timeframeTest1() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/services/timeframe?country=United%20States&city=New%20York&from=2022-04-16&to=2022-05-03&frame=86400',
        maxRequests: 5000,
        concurrency: 100,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Timeframe API endpoint for a timeframe of 1 day from 2022-04-16 to 2022-05-03 at New York", timeframeTest2));
}


// Test the Timeframe API endpoint with 5000 requests for timeframe of 1 day from 2022-04-16 to 2022-05-03 at New York

function timeframeTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/services/timeframe?country=United%20States&city=New%20York&from=2022-04-16&to=2022-05-03&frame=86400&latencyOnly=on',
        maxRequests: 5000,
        concurrency: 100,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Timeframe API endpoint for a timeframe of 1 day from 2022-04-16 to 2022-05-03 at New York with latencies only", tableTest1));
}


/////////////////////////////////////////////////////////////////////
//////////////////////////TESTS TABLE API////////////////////////////
/////////////////////////////////////////////////////////////////////


// Test the Table API endpoint with 500 requests for country USA and city New York from 2022-05-20 to 2022-06-12 for 20 latency values

function tableTest1() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/services/table?country=United%20States&city=New%20York&from=2022-05-20&to=2022-06-12&limit=20',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Table API endpoint for country USA and city New York from 2022-05-20 to 2022-06-12 for 20 latencies", tableTest2));
}


// Test the Table API endpoint with 500 requests for country USA and city New York from 2022-05-20 to 2022-06-12 for 20 latency values page 2

function tableTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/services/table?country=United%20States&city=New%20York&from=2022-05-20&to=2022-06-12&skip=20&limit=20',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Table API endpoint for country USA and city New York from 2022-05-20 to 2022-06-12", tableTest3));
}

// Test the Table API endpoint with 500 requests for country USA and city New York from 2022-05-20 to 2022-06-12 for 20 latency values sorted by latency

function tableTest3() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/services/table?country=United%20States&city=New%20York&from=2022-05-20&to=2022-06-12&limit=20&sortBy=latency',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the Table API endpoint for country USA and city New York from 2022-05-20 to 2022-06-12 for 20 latencies sorted by latency", searchTest1));
}


/////////////////////////////////////////////////////////////////////
//////////////////////////TESTS SEARCH API///////////////////////////
/////////////////////////////////////////////////////////////////////

// Test the World API endpoint with 500 requests

function searchTest1() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/search/world',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the World API endpoint for countries overview", searchTest2));
}

// Test the Search API endpoint with 500 requests for countries

function searchTest2() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/search/locations?featureCode=P',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the World API endpoint for countries overview", searchTest3));
}

// Test the Search API endpoint with 500 requests for regions in France

function searchTest3() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/search/locations?featureCode=R&countryCode=FR',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the World API endpoint for countries overview", searchTest4));
}

// Test the Search API endpoint with 500 requests for cities in Brittany in France

function searchTest4() {
    loadtest.loadTest({
        url: 'http://localhost:3000/api/search/locations?featureCode=V&countryCode=FR&admin1Code=53',
        maxRequests: 500,
        concurrency: 50,
        method: 'GET',
        contentType: 'application/json',
        statusCallback: statusCallback
    }, testEnd("Test of the World API endpoint for countries overview", end));
}


/////////////////////////////////////////////////////////////////////


function end() {
    const file = fs.createWriteStream('performance.log');
    file.write(logs)
    file.end();
}