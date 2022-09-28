const {timeQuery, spaceQuery, query} = require('../../utils/dbQuery');
const Position = require('../../utils/position');
const connection = require('../../configurations/dbConfigurations')

const db = connection()

exports.makeQuery = (req, res, next) => {
    if(req.query.start || req.query.end) {
        if(req.query.long && req.query.lat) {
            const maxDistance = req.query.maxDistance ? parseInt(req.query.maxDistance) : undefined

            query(db, {area: {position: new Position([parseFloat(req.query.long), parseFloat(req.query.lat)]), maxDistance: maxDistance},
                                 timeZone: {from: new Date(parseInt(req.query.start)*1000), to: new Date(parseInt(req.query.end)*1000)}})
                .then((doc) => {
                    res.status(200).json(doc)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    });
                })

        } else {
            timeQuery(db, {from: new Date(parseInt(req.query.start)*1000), to: new Date(parseInt(req.query.end)*1000)})
                .then((doc) => {
                    res.status(200).json(doc)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        error: error
                    });
                })
        }
    } else if (req.query.long && req.query.lat) {
        const maxDistance = req.query.maxDistance ? parseInt(req.query.maxDistance) : undefined
        spaceQuery(db, new Position([parseFloat(req.query.long), parseFloat(req.query.lat)]), maxDistance)
            .then((doc) => {
                res.status(200).json(doc)
            })
            .catch((error) => {
                console.log(error)
                res.status(400).json({
                    error: error
                });
            })
    } else {
        res.status(200).json({})
    }

    // query(db, {area: {position: new Position([0.1967691, 48.0074054]), maxDistance: 500000}, timeZone: {from: new Date(1623354373*1000), to: new Date(1623369600*1000)}}).then((doc) => {
    //     res.status(200).json(doc)}
    //     ).catch((error) => {
    //         console.log(error)
    //         res.status(400).json({
    //         error: error
    //     });
    // })
}