  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coupleSchema = mongoose.Schema({
    person1: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    person2:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type: String,
        default: ""
    },
    images:{
        type: String,
        default: ""
    }
})

const Couple = mongoose.model('Couple', coupleSchema);

module.exports = { Couple }