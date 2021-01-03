const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
})
UserSchema
    .virtual('url')
    .get(function() {
        return '/users/' + this._id
})

module.exports = mongoose.model("User", UserSchema)