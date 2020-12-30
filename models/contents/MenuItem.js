const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuItemSchema = new Schema({
    image:{ 
        data: Buffer, 
        contentType: String
    },
    name: { type: String, default: "" },
    content: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

MenuItemSchema
    .virtual('url')
    .get(function() {
        return '/menu/' + this._id
    })

module.exports = mongoose.model("MenuItem", MenuItemSchema)