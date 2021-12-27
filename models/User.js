const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true},
    registrationDate: { type: Date},
    userStatus: {type: String, required:true},
    loginDate: {type: Date, required: true},
});


module.exports = model('User', schema);