const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
            if(err){
                return res.sendStatus(403);
            }
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports = verifyToken