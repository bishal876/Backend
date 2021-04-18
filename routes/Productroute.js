const express = require('express');
const Product = require('../models/Productmodel');
const router = express.Router();
const {check,validationResult} =require('express-validator');
const auth = require('../middleware/auth');
//const upload = require('../middleware/fileupload');


router.post('/Product/insert',/*auth.verifyUser, auth.verifyDocter,*/ function(req,res){
    console.log(req.body)
    const errors = validationResult(req);

    if (errors.isEmpty){
      
const ProductName=req.body.ProductName;
const HouseNo = req.body.HouseNo;
const Area = req.body.Area;
const Location = req.body.Location;
const PhoneNo = req.body.PhoneNo;
const Description = req.body.Description;
const PriceRate = req.body.PriceRate;
    const pdata = new Product({
    ProductName:ProductName,
    Area:Area,
    HouseNo:HouseNo,
    Location:Location,
    PhoneNo:PhoneNo,
    Description:Description,
    PriceRate:PriceRate
    })
    pdata.save()
    .then(function(res){
        res.status(201).json({messge : "Successfully added!!"})
    })
    .catch(function(eeeeee){
        res.status(500).json({ message : eeeeee})
    })
}
else {
    //invalid
    res.status(400).json(errors.array());
}

})



router.get('/Product/show', function(req,res){
    // console.log("this is for showing data")
    // res.send("test show")
  Product.find()
    .then(function(data){
    // console.log(data);
        res.status(200).json(data);
})
.catch(function(e){
    res.status(500).json({error : e})
})
})
router.get('/Product/single/:id', function(req,res){
    // console.log("this is for showing data")
    // res.send("test show")
    //console.log(req.body)
   Product.findOne({_id : req.params.id})
    .then(function(data){
    console.log(data);
        res.status(200).json(data);
})
.catch(function(e){
    res.status(500).json({error : e})
})
})



// for delete
router.delete('/Product/delete/:id',auth.verifyUser, function(req,res){
//delete code
const id = req.params.id;
Product.deleteOne({_id : id})
.then((result)=>{
    res.status(200).json({message : "deleted !!"})
})
.catch((e)=>{
    res.status(500).json({error : e})
})

})
// for update
router.put('/Product/update', function(req,res){
    console.log(req.body)
    const id = req.body.id;
    const FullName = req.body.FullName;
    const Profession = req.body.Profession;
    const PriceRate = req.body.PriceRate;
   Product.updateOne({_id : id},{FullName : FullName,Profession : Profession, PriceRate:PriceRate}).then(function(){
        res.status(200).json({message : true})
    })
    .catch(function(err){
        console.log(err)
    })
})
module.exports = router;