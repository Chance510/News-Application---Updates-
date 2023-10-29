const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true
    }, 
    body: {
        type: String, 
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('News', newsSchema);