const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: {
        menu_permissions: [{ type: String, enum: ['create', 'delete', 'update', 'none'], required: true }],
        user_permissions: [{ type: String, enum: ['create', 'delete', 'update', 'none'], required: true }]
    }
})
RoleSchema
    .virtual('url')
    .get(function() {
        return '/users/role/' + this._id
})

module.exports = mongoose.model("Role", RoleSchema)