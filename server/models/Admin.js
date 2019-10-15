const mongoose = require('mongoose');
const mongooseSchemaExtend = require('mongoose-schema-extend');
const UserSchema = require('./User');

const AdminSchema = UserSchema.mongooseSchemaExtend({});

module.exports = mongoose.model('admins', AdminSchema);