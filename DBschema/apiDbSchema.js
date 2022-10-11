const mongoose = require('mongoose');
 
const api6Schema = new mongoose.Schema({
        value: [{type: Number, required: true}],
        update: [{ type: Date, default: Date.now }]
});

module.exports = mongoose.model('API-7.0', api6Schema);   //here you can set a DB name ''