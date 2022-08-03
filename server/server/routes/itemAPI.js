const express = require(`express`);
const router = express.Router();
const Item = require(`../models/Item`);
const moment = require("moment")
const data = require("../../data.json");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

router.get(`/items`, function (request, response) {
  let categoryName = request.query.category;
  let filter = categoryName ? { category: categoryName } : {}
  if (categoryName) {
    Item.find(filter).sort({ dateOfExpire: 1 }).exec(function (err, items) {
      if (err) {
        response.status(500).send(err);
        return;
      } else if (!items) {
        response.status(404).send("No Results");
        return;
      }
      response.send(items);
    })

  } else {
    response.status(400).send("bad request");
  }
}
);

router.put(`/item`, function (request, response) {
  response.send(`delete item`);
});

router.get(`/item`, function (request, response) {
  let id = request.query.id;
  let isValidId = mongoose.Types.ObjectId.isValid(id)
  if (id && isValidId) {
    Item.findById(id).exec(function (err, item) {
      if (err) {
        response.status(500).send(err);
        return;
      } else if (!item) {
        response.status(404).send("No Results");
        return;
      }
      if (validateTime(item)) {
          
          return response.send(
            { 
              message: "Item is no longer available for bid",
              item: item
            })
      }
      response.send( { 
        message: "ok",
        item: item
      });
    })
  } else {
    response.status(400).send("bad request");
    
  }
});

router.post(
  `/item`,
  body("price").isNumeric({ no_symbols: true }),

  function (request, response) {
    console.log(request.body);
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      const item = request.body;
      item.dateOfExpire = new Date(moment().add(1, "days").format("lll"));

      const newItem = new Item(item);
      newItem.save(function (error, savedItem) {
        if (error) {
          response.status(500).send(error);
          return;
        }
        response.status(201).send(savedItem);
      });
    } else {
      response.status(400).send(errors);
    }
  }
);

function validateTime(item) {
  let timeLeft = new Date(item.dateOfExpire).getTime() - new Date().getTime()
  if (timeLeft <= 0) {
    item.available = false
    if (item.bids.length > 0) {
      item.isSold = true
    }
    return true
  }
  return false
}

router.put(`/bid`,
  body("bidValue").isNumeric({ no_symbols: true }),
  body("email").isEmail(),
  function (request, response) {
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      const bidData = request.body
      const value = {
        user: bidData.email,
        bidAmount: bidData.bidValue
      }
      Item.findById(bidData.itemRoom, function (err, item) {
        if (err) {
          return response.status(404).send({ message: "404 not found", err: err })
        }
        try {
          let res = {}
          if (validateTime(item)) {
            res.message = "This item is no longer available"
          }
          else if (bidData.bidValue <= item.price) {
            const error = {
              param: "bidValue",
              msg: "the bid must be greater than the current price",
              value: ''
            };
            throw (error)

          } else {
            item.price = bidData.bidValue
            item.bids.push(value)
            res = { bidder: value, message: "bids updated" }
          }

          item.save().then(i => {
            res.item = i
            request.io.to(bidData.itemRoom).emit("bidding", res)
            request.io.emit("reload")
            response.send(res)

          }).catch(err => {
            return response.status(404).send({ message: "failed to update", error: err })
          })

        } catch (error) {
          response.status(400).send(error);
        }
      });
    } else {
      response.status(400).send(errors);
    }

  })




module.exports = router;

