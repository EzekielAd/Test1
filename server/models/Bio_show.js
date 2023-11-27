let mongoose = require('mongoose');

// create a model class
let showModel = mongoose.Schema({
    title:String,
    genre:String,
    rating: Number
},
{
    collection:"watchlist"
});
module.exports = mongoose.model('Show',showModel);
