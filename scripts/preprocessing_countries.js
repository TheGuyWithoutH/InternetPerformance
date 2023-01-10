/**
 * @file Creation of the JSON file for the country to put in MongoDB with mongoimport
 * @author Ugo Balducci
 * @version 1.0.0
 */

const fs = require('fs');
const http = require('http');

const LineTransformStream = require( 'line-transform-stream' );

const data = require("./custom.geo.json");


////////////////////////////////////////////
////////////PARAMETERS for Queries//////////
////////////////////////////////////////////
const parameters = {
    server_url: "127.0.0.1",
    port: 3000,
    db_name: 'test_semester_project',
    location_collection_name: "locations",
}

const output = [];

//Get all fields from geojson file
Promise.all(data.features.filter(country => country.properties.iso_a2_eh != "-99").map((feature) => new Promise((resolve, reject) => {
    const { properties, geometry } = feature;
    const { name, pop_est, iso_a2_eh, label_x, label_y } = properties;

    console.log("Retrieving " + name + "(" + iso_a2_eh + ") data...")

    var options = {
        hostname: parameters.server_url,
        port: parameters.port,
        path: '/api/query/spatial?country_code=' + iso_a2_eh,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };


    const req = http.request(options, function(res) {
        let result = '';

        res.setEncoding('utf8');

        res.on('data', function (data) {
            result += data
        });

        res.on('end', function() {
            let country_data 
            try {
                country_data = JSON.parse(result)
            } catch (error) {
                console.log("Error parsing data " + result)
                throw error
            }
    
            const stats = country_data.stats ? {
                ...country_data.stats,
                user_count: country_data.users.length
            } : {user_count: 0}
    
            const location = {
                feature_code: 'P',
                name: name,
                country_code: iso_a2_eh,
                population: pop_est,
                position: [label_x, label_y],
                geometry: geometry,
                stats: stats
            }
    
            output.push(location);
            resolve();
        })

    });

    req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    });
      
    req.end();
}))).then(() => {
    fs.writeFileSync('locations_countries.json', JSON.stringify(output));
})

