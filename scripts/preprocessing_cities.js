/**
 * @file Creation of the JSON file for the cities to put in MongoDB with mongoimport
 * @author Ugo Balducci
 * @version 1.0.0
 */

// Reading the file using default
// fs npm package
// Reading the file using default
// fs npm package
const fs = require("fs");

const LineTransformStream = require( 'line-transform-stream' );

// Opening Streams for Input and Output
csv = fs.createReadStream("cities500.txt")
out = fs.createWriteStream('locations_cities.json', "utf8");

 
//List of Geoname's headers
let headers = ["geonameid", "name", "asciiname", "alternatenames", "latitude", "longitude", "feature class", "feature code", "country code", "cc2", "admin1 code", "admin2 code", "admin3 code", "admin4 code", "population", "elevation", "dem", "timezone", "modification date"] 

//Selection of columns we want to keep
let header_select = [2, 8, 10]

// create new line transform stream
const converter = new LineTransformStream( ( line ) =>
{
    fields = line.split("\t");
    data_out = {
        "feature_code": "V"
    }

    //Get selected fields and place them in a JS object
    for(field in header_select) {
        switch(headers[header_select[field]]) {
            case "country code":
                data_out["country_code"] = fields[header_select[field]]
                break
            case "admin1 code":
                data_out["admin1_code"] = fields[header_select[field]]
                break
            case "asciiname":
                data_out["name"] = fields[header_select[field]]
        }
    }
    

    // Transform JS Object to a JSON
    json_data = JSON.stringify(data_out)

    return json_data;
})

// connect input file via transform stream to output file
stream = csv.pipe(converter).pipe(out)