module.exports = (req, res, next) => {
    try{
        if(req.query.coordinates) req.query.coordinates = req.query.coordinates.split(",").map((str) => parseFloat(str))
    
        if(req.query.maxDistance) req.query.maxDistance = parseInt(req.query.maxDistance)
    
        if(req.query.from) {
            const arrayDate = req.query.from.split("-")
    
            if(arrayDate[0].length > 4) req.query.from = new Date(parseInt(arrayDate[0])*1000)
            else if (arrayDate.length == 1) req.query.from = new Date(arrayDate[0], 1)
            else req.query.from = new Date(req.query.from)
        }
    
        if(req.query.to) {
            const arrayDate = req.query.to.split("-")
    
            if(arrayDate[0].length > 4) req.query.to = new Date(parseInt(arrayDate[0])*1000)
            else if (arrayDate.length == 1) req.query.to = new Date(arrayDate[0], 1)
            else req.query.to = new Date(req.query.to)
        }
    
        next()
    } catch(error) {
        res.status(401).json({ error });
    }
}