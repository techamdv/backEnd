const JWT = require('jsonwebtoken')
require('dotenv').config();


const fetchUser = (req,res,next) => {
    const token = req.headers.authorization;
    console.log(req.headers.authorization);
    
    if(!token){
        return res.status(401).json({ error: 'ACCESS DENIED' });
    }
    try {
        console.log(token,process.env.JWT_SECRET);
        
        const userData =  JWT.verify(token,process.env.JWT_SECRET)
        req.user = userData.user


    next();      
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: 'error occure' });
    }




}
module.exports = fetchUser