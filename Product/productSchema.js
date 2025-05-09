const mongoose = require('mongoose')

const productschema = mongoose.Schema({

    Name: {
        type: String
    },
    Model: {
        type: String
    },
    Price: {
        type: Number
    },
    category: {
        type: String
    }

})
module.exports=mongoose.model('Product',productschema)