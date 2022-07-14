const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const itemSchema = new Schema({
  title: String,
  category: String,
  imageURL: String, //firebase link
  price: Number,
  available: Boolean,
  dateOfApprove: Date,
  dateOfExpire: Date,
  isApproved: Boolean,
  description: String,
 // Users: [{ type: Schema.Types.ObjectId, ref: `User` }],
  bids: [{
    type: Schema.Types.ObjectId, ref: `User`,
    bidAmount: {
      type: Number,
      unique: true
    }
  }]
})

const Item = mongoose.model(`Item`, itemSchema, `Items`)
module.exports = Item
