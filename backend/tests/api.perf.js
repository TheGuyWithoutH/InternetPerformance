/**
 * @file Manage the configuration and connection to Mongoose
 * @author Ugo Balducci
 * @version 1.0.0
 */

const loadtest = require('loadtest');

var gLatency;

function statusCallback(latency, result, error) {
gLatency = latency;
}

const testEnd = (operation) => 
    function (error, result) {
        if (error) {
            console.error('Got an error: %s', error);
        } else if (operation.running == false) {
            console.info("\n==============================\n");
            console.info("Requests per hour: " + noRequestPerHour)
            console.info("Avg request time(Millis): " + avgRequestTime)
            console.info("\n==============================\n")
            console.info("Total Requests :", gLatency.totalRequests);
            console.info("Total Failures :", gLatency.totalErrors);
            console.info("Requests/Second :", gLatency.rps);
            console.info("Requests/Hour :", (gLatency.rps * 3600));
            console.info("Avg Request Time:",gLatency.meanLatencyMs);
            console.info("Min Request Time:",gLatency.minLatencyMs);
            console.info("Max Request Time:",gLatency.maxLatencyMs);
            console.info("Percentiles :", gLatency.percentiles)
            console.info("\n===============================\n")
    
            console.log(result);
        }
    }


//Test the Spatial API endpoint with 60 requests for city Paris
console.info("\n==============================\n");
console.info("Test of the User ID API endpoint with 60 requests")
console.info("\n==============================\n")

var operation1 = loadtest.loadTest({
    url: 'http://localhost:3000/api/query/spatial?city=Paris',
    maxRequests: 60,
    concurrency: 20,
    method: 'GET',
    contentType: 'application/json',
    statusCallback: statusCallback
}, testEnd(operation1));