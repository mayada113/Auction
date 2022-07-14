const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    email : {
      type: String,
      unique: true
    },
    phoneNumber : String,
    birthDay : Date,
    roles:{
       user:Number,
       admin:Number
    },
    Items : [{type : Schema.Types.ObjectId , ref: `Item`}],
    historyItem : [{type : Schema.Types.ObjectId , ref: `Item`}]
  })


const User = mongoose.model(`User` , userSchema , `Users`)
module.exports = User