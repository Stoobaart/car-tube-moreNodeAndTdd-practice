var mongoose = require('mongoose');

var CarSchema = mongoose.Schema({
    name: String,
    price: Number,
    condition: String,
    year: Number,
    body: String,
    color: String
});

module.exports = mongoose.model('Car', CarSchema);