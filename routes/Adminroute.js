const express = require('express');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const Admin = require('../models/Adminmodel');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/admin/insert',  function (req, res) {
    console.log(req.body)
    const errors = validationResult(req);

    // res.send(errors.array());
    if (errors.isEmpty) {
        //valid
        const FullName = req.body.FullName;
        const Username = req.body.Username;
        const Password = req.body.Password;
        // console.log(us);
        // console.log(add); 
        bcryptjs.hash(Password, 10, function (err, hash) {
            const data = new Admin({
                FullName: FullName,
                Username: Username,
                Password: hash
            });
            data.save()
                .then(function (result) {
                    res.status(201).json({ message: "Admin Registration success !!!!" })
                })// sucessess vayo ki vaena
                .catch(function (err45) {
                    res.status(500).json({ error: err45 })
                })// error aayo ki aayena
        })

    }
    else {
        //invalid
        res.status(400).json(errors.array());
    }
})

//Login System .........................
router.post('/admin/login', function (req, res) {
    const Username1 = req.body.Username;
    const Password1 = req.body.Password;
    console.log(Username1, Password1)
    Admin.findOne({ Username: Username1 })
        .then(function (userData1) {
            //if username doesnot exist
            if (userData1 === null) {
                return res.status(401).json({ error: "Invalid Credentials111 !! " })
            }
            // if username exists
            bcryptjs.compare(Password1, userData1.Password, function (err, result) {
                if (result === false) {
                    //password worng
                    return res.status(401).json({ error: "Invalid Credentials !!" })
                }
                //then generate token - ticket
                const token = jwt.sign({ UserId: userData1._id }, 'anysecrectkey')
                // res.send(token)
                return res.status(200).json({
                    message: "Success !!",
                    token: token                
                
                })
            })
        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})


router.get('/admin/show', function (req, res) {
    // console.log("this is for showing data")
    // res.send("test show")
    Admin.find().then(function (data) {
        // console.log(data);
        res.send(data);
    })
})

// for delete
router.delete('/admin/delete/:id', auth.verifyUser, function (req, res) {
    //delete code
    const id = req.params.id;
    Admin.deleteOne({ _id: id }).then(function () {
        res.send("Admin Deleted !")
    })

})
// for update
router.put('/admin/update/:id', function (req, res) {
    const id = req.params.id;
    const FullName = req.body.FullName;
    Admin.updateOne({ _id: id }, { Username: Username }).then(function () {
        res.send("Admin Updated!")
    })
})
module.exports = router;