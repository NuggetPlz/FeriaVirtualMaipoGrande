var oracledb = require('oracledb');

const UserSchema = new oracledb.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
{ collection: 'users' }
)

const model = oracledb.model('UserSchema', UserSchema)

module.exports = model