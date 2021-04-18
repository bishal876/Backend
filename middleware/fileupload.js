const multer = require('multer'); //install

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./pictures')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+ file.originalname);
    }
})
const fileFilter = function(req,file,cb){
    if(file.mimrtype == 'pictures/jpeg' || file.mimetype == 'pictures/png')
    // (file.mimetype == 'application/pdf') for pdf files
    {
        cb(null,true)

    }
    else{
        cb(null,false)
    }

}
const upload = multer({
    storage : storage,
    fileFilter : fileFilter
});
module.exports = upload;