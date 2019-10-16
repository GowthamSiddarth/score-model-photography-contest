const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User');

const AdminSchema = new Schema(UserSchema.schema);

module.exports = mongoose.model('admins', AdminSchema);