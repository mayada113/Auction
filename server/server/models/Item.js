const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const itemSchema = new Schema({
  title: String,
  category: String,
  imageURL: String, //firebase link
  price: Number,
  available: Boolean,
  dateOfApprove: Date,
  isSold:Boolean,
  dateOfExpire: Date,
  isApproved: Boolean,
  description: String,
  bids: [{
    user:String,
    bidAmount: Number,
  }]
})

const Item = mongoose.model(`Item`, itemSchema, `Items`)
module.exports = Item
