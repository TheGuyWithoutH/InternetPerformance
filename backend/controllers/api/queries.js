const assert = require('node:assert').strict;
const {timeQuery, spaceQuery, query, queryTypes} = require('../../utils/dbQuery');
const Position = require('../../utils/position');
const connection = require('../../configurations/dbConfigurations')

const db = connection()

exports.makeGlobalQuery = (req, res, next) => {

    let queryType

    //Check if query contains spatial params. If so, check formatting and transform coordinates into array
    if(req.query.coordinates || req.query.country || req.query.country_code || req.query.region || req.query.county || req.query.city) {
        assert((req.query.country || req.query.country_code || req.query.region || req.query.county || req.query.city) ? !req.query.coordinates : req.query.coordinates, Error("Arguments wrongly formatted : location"))
        queryType = queryTypes.SPATIAL
    }
    
    //Check if query contains time params. If so, refactor dates.
    if(req.query.from || req.query.to) {
        queryType = queryType === queryTypes.SPATIAL ? queryTypes.COMBINED : queryTypes.TIME
    }

    
    switch (queryType) {
        case queryTypes.SPATIAL:

            const maxDistance = req.query.maxDistance ? parseInt(req.query.maxDistance) : undefined
            spaceQuery(db, new Position(req.query.coordinates), maxDistance)
                .then((doc) => {
                    res.status(200).json(doc)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    });
                })
            break;

        case queryTypes.TIME:

            timeQuery(db, req.query)
                .then((doc) => {
                    res.status(200).json(doc)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    });
                })
            break;

        case queryTypes.COMBINED:
            query(db, req.query)
                .then((doc) => {
                    res.status(200).json(doc)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    });
                })
            break;
        default:
            break;
    }




    // if(req.query.start || req.query.end) {
    //     if(req.query.long && req.query.lat) {
    //         const maxDistance = req.query.maxDistance ? parseInt(req.query.maxDistance) : undefined

    //         query(db, {area: {position: new Position([parseFloat(req.query.long), parseFloat(req.query.lat)]), maxDistance: maxDistance},
    //                              timeZone: {from: new Date(parseInt(req.query.start)*1000), to: new Date(parseInt(req.query.end)*1000)}})
    //             .then((doc) => {
    //                 res.status(200).json(doc)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //                 res.status(400).json({
    //                     error: error
    //                 });
    //             })

    //     } else {
    //         timeQuery(db, {from: new Date(parseInt(req.query.start)*1000), to: new Date(parseInt(req.query.end)*1000)})
    //             .then((doc) => {
    //                 res.status(200).json(doc)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //                 res.status(400).json({
    //                     error: error
    //                 });
    //             })
    //     }
    // } else if (req.query.long && req.query.lat) {
    //     const maxDistance = req.query.maxDistance ? parseInt(req.query.maxDistance) : undefined
    //     spaceQuery(db, new Position([parseFloat(req.query.long), parseFloat(req.query.lat)]), maxDistance)
    //         .then((doc) => {
    //             res.status(200).json(doc)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             res.status(400).json({
    //                 error: error
    //             });
    //         })
    // } else {
    //     res.status(200).json({})
    // }

}

exports.makeUserIdQuery = (req, res, next) => {
    if(!req.query.id) throw new Error("Missing argument in query : 'id'.")
    
    if(req.query.latencyOnly === "on") {
        
    } else {
        
    }
}

exports.makeStreamIdQuery = (req, res, next) => {
    if(!req.query.id) throw new Error("Missing argument in query : 'id'.")
    
    if(req.query.latencyOnly === "on") {
        
    } else {
        
    }
}




        // query(db, {area: {position: new Position([0.1967691, 48.0074054]), maxDistance: 500000}, timeZone: {from: new Date(1623354373*1000), to: new Date(1623369600*1000)}}).then((doc) => {
        //     res.status(200).json(doc)}
        //     ).catch((error) => {
        //         console.log(error)
        //         res.status(400).json({
        //         error: error
        //     });
        // })