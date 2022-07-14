const express = require(`express`);
const router = express.Router();
const Item = require(`../models/Item`);
const moment = require("moment");
const data = require("../../data.json");
const { body, validationResult } = require("express-validator");

router.get(`/items`, function (request, response) {
  let categoryName = request.query.category;
  let filter = categoryName ? { category: categoryName } : {};
  Item.find(filter)
    .sort({ dateOfExpire: 1 })
    .exec(function (err, items) {
      if (err) {
        response.status(500).send(err);
        return;
      } else if (!items) {
        response.status(404).send("No Results");
        return;
      }
      response.send(items);
    });
});

router.delete(`/item`, function (request, response) {
  response.send(`delete item`);
});
router.put(`/item`, function (request, response) {
  response.send(`update item`);
});

router.post(
  `/item`,
  body("title").isAlphanumeric(),
  body("description").isAlphanumeric(),
  body("price").isNumeric({ no_symbols: true }),
  function (request, response) {
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

router.get(`/bid`, function (request, response) {
  const itemId = request.query.itemId;

  response.send("new bid was added");
});

router.post(
  `/bid`,
  body("bid").isNumeric({ no_symbols: true }),
  function (request, response) {
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      const bidData = request.body.bidValue;
      response.send("new bid was added");
      request.io.to(request.body.itemRoom).emit("biding", bidData);
    } else {
      response.status(400).send(errors);
    }
  }
);

module.exports = router;
