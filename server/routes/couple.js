const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Couple } = require("../models/Couple");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/", auth, (req, res) => {

    console.log(req.body)
    let codeArray = [req.body.myCode, req.body.yourCode]
    let ids = []
    User.updateMany(
        { connectToken: { $in: codeArray } },
        { isCouple: true },
        (err, userInfo) => {
            if (err)
                return res.status(400).send({ success: false, err })
            //res.status(200).send({success: true})
            User.find(
                { connectToken: { $in: ["19372108", "63402916"] } },
                (err, users) => {
                    users.forEach((user) => {
                        ids.push(user._id)
                        console.log(ids)
                    })
                    Couple.insertMany({
                        person1: ids[0]._id,
                        person2: ids[1]._id
                    }, (err, result) => {
                        if (err)
                            return res.status(400).send({ success: false, err })
                        return res.status(200).send({ success: true, result })
                    })
                }
            )
        })
});

module.exports = router;
