/**
 * @file Creation of the JSON file for the regions to put in MongoDB with mongoimport
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
csv = fs.createReadStream("admin1CodesASCII.txt")
out = fs.createWriteStream('locations_regions.json', "utf8");

 
//List of Geoname's headers
let headers = ["code", "name", "name ascii", "geonameid"] 

//Selection of columns we want to keep
let header_select = [0, 2]

// create new line transform stream
const converter = new LineTransformStream( ( line ) =>
{
    fields = line.split("\t");
    data_out = {
        "feature_code": "R"
    }

    //Get selected fields and place them in a JS object
    for(field in header_select) {
        switch(headers[header_select[field]]) {
            case "code":
                data_out["country_code"] = fields[header_select[field]].split('.')[0]
                data_out["admin1_code"] = fields[header_select[field]].split('.')[1]
                break
            case "name ascii":
                data_out["name"] = fields[header_select[field]]
        }
    }
    

    // Transform JS Object to a JSON
    json_data = JSON.stringify(data_out)

    return json_data;
})

// connect input file via transform stream to output file
stream = csv.pipe(converter).pipe(out)