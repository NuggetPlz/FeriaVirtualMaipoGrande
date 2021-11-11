
var oracledb = require('oracledb');

var UserSchema = oracledb.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
{ collection: 'users' }
)

var model = oracledb.model('UserSchema', UserSchema)

module.exports = model
