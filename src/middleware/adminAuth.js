module.exports = (req, res, next) =>{
    if(!req.user.isAdmin){
        res.status(401).send('Admin previlage level access')
    }
    next()
}