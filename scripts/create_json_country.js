// Reading the file using default
// fs npm package
const fs = require("fs");

const LineTransformStream = require( 'line-transform-stream' );

// Opening Streams for Input and Output
csv = fs.createReadStream("allCountries.txt")
out = fs.createWriteStream('location_names.json', "utf8");

counter = 0

// Starting brackets of the file for the JSON array
out.write("[");
 
//List of Geoname's headers
let headers = ["geonameid", "name", "asciiname", "alternatenames", "latitude", "longitude", "feature class", "feature code", "country code", "cc2", "admin1 code", "admin2 code", "admin3 code", "admin4 code", "population", "elevation", "dem", "timezone", "modification date"] 

//Selection of columns we want to keep
let header_select = [0, 1, 2, 3, 4, 5, 8]

// create new line transform stream
const converter = new LineTransformStream( ( line ) =>
{
    fields = line.split("\t");
    data_out = {}

    //Get selected fields and place them in a JS object
    for(field in header_select) {
        switch(headers[header_select[field]]) {

            //Array cases
            case "alternatenames":
            case "cc2":
                data_out[headers[header_select[field]]] = fields[header_select[field]].split(',')
                break

            //Coordinate case (we put them in the same array for GeoJSON points)
            case "longitude":
                break
            case "latitude":
                data_out["coordinates"] = [fields[header_select[field + 1]], fields[header_select[field]]]
                break

            //Default case for single values
            default:
                data_out[headers[header_select[field]]] = fields[header_select[field]]
                break

        }
    }

    // Transform JS Object to a JSON
    json_data = JSON.stringify(data_out) + ","

    // Display progress
    if((++counter % 1000) === 0) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write("Line " + counter + " done")
    }

    return json_data;
})

// connect input file via transform stream to output file
stream = csv.pipe( converter ).pipe(out)

// End of the file
stream.on("finish", () => out.write("]"))