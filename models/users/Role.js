const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: String, enum: ['create', 'delete', 'update', 'admin'], required: true },
})
RoleSchema
    .virtual('url')
    .get(function() {
        return '/role/' + this._id
})

module.exports = mongoose.model("Role", RoleSchema)