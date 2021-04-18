const mongoose = require('mongoose');

const Admin = mongoose.model('Admin',{
    FullName : {
        type : String,
        required : true
    },
    Username: {
        type : String,
        required : true
    },
    Password: {
        type : String,
        required : true
    }
   
})
module.exports=Admin;