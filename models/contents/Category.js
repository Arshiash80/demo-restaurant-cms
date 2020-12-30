const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

CategorySchema 
    .virtual('url')
    .get(function() {
        return '/category/' + this.id
    })


module.exports = mongoose.model("Category", CategorySchema)