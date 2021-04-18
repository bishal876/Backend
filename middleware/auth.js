const jwt = require('jsonwebtoken');
//const { RSA_NO_PADDING } = require('node:constants');
const User = require('../models/Productmodel');





//guard 1
module.exports.verifyUser =function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data1 = jwt.verify(token, 'anysecretkey');
        //in this data id is availabel..
        User.findOne({_id : data1.userID})
        .then(function(userData){
            req.user111 = userData;
            next();
        })
        .catch(function(ee){
            res.status(401).json({error : ee});
        })
    }

    catch(e){
        res.status(401).json({error : e})
    }

}

//guard 1

















































































































//guard 2????
module.exports.verifyBuyer = function(req, res, next){
    if(!rew.user111){
        return res.status(401).json({message : "Unauthorized!"})
    }
    else if(req.user111.role!=="Buyer"){
        return res.status(401).json({message : "Unauthorized!"})
    }
    /////////everything is clear
    next();
}

//guard 2????
module.exports.verifySeller = function(req,res,next){
    if(!req.user111){
        return res.status(401).json({message : "unauthorized!"})
    }
    else if(req.user111.role!=="Seller"){
        return res.status(401).json({message : "Unauthorized!"})
    }
    ///////////everything is clear
    next();
}

module.exports.verifyAdmin = function(req,res,next){
    if(!req.user111){
        return res.status(401).json({message : "Unauthorized!"})
    }
    else if(req.user111.role!=="Admin"){
        return res.status(401).json({message: "Unauthorized!"})
    }
    ///////////everything is clear
    next()
}

