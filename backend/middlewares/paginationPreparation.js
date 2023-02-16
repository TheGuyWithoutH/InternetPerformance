const {Request, Response, NextFunction} = require('express')


module.exports = (req, res, next) => {
    try{
        if (!req.query.limit){
            req.query.limit = 10
        }else{
            req.query.limit = parseInt(req.query.limit)
        }

        if(req.query.limit > 100){
            req.query.limit = 100
        }
    
        if (!req.query.page){
            req.query.page = 1
        }else{
            req.query.page = parseInt(req.query.page)
        }

    
        next()
    } catch(error) {
        res.status(401).json({ error });
    }
}

