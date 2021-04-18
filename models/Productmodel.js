const mongoose = require('mongoose');

const Product = mongoose.model('Product',{
    ProductName : {
        type : String,
        required : true
    },
    Area: {
        type : String,
        required : true
    },
    HouseNo: {
        type : String,
        required : true
    },
    Location: {
        type : String,
        required : true
    },
    PhoneNo: {
        type : String,
        required : true
    },
   
    Description:{
        type: String
    },
    PriceRate: {
        type : String,
        required : true
    }
   
})
module.exports=Product;