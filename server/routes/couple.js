const express = require('express');
const router = express.Router();
const multer = require('multer')
const { User } = require("../models/User");
const { Couple } = require("../models/Couple");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("images")

router.post("/", auth, (req, res) => {
    let codeArray = [req.body.myCode, req.body.yourCode]
    let ids = []
    if (req.body.filter) {
        if(req.body.filter ==='setinfo'){
            Couple.updateOne({
                _id:req.user.coupleId
            },{
                images: req.body.filepath,
                date : req.body.date
            }, (err, document)=>{
                if(err)
                return res.status(400).send({success: false, err})
                return res.status(200).send({success: true, document})
            })
        }
    } else {
        User.updateMany(
            { connectToken: { $in: codeArray } },
            { isCouple: true },
            (err, userInfo) => {
                if (err)
                    return res.status(400).send({ success: false, err })
                //res.status(200).send({success: true})
                User.find(
                    { connectToken: { $in: codeArray } },
                    (err, users) => {
                        if (err)
                            return res.status(400).send({ success: false, err })
                        users.forEach((user) => {
                            ids.push(user._id)
                        })
                        Couple.insertMany({
                            person1: ids[0]._id,
                            person2: ids[1]._id
                        }, (err, result) => {
                            if (err)
                                return res.status(400).send({ success: false, err })
                            User.updateMany({
                                _id: { $in: ids }
                            }, { coupleId: result[0]._id }, (err, doc) => {
                                if (err)
                                    return res.status(400).send({ success: false, err })
                                return res.status(200).send({ success: true, result })
                            })
                        })
                    }
                )
            })
    }
});
router.post("/image", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        } else {
            return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        }
    })
});

module.exports = router;
