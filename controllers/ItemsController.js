const Category = require("../models/categoryModel");
var mongoose = require("mongoose");
const Items = require("../models/ItemsModel");
const API = require("../models/apiModel");
const Supermarket = require("../models/SupermarketModel");

exports.CreateItems = async (req, res, next) => {
  let category = await Category.findById(req.body.catID);

  const item = await Items.create({
    name: req.body.name,
    category: category._id,
    price: 0,
    active: true,
  });

  let ids = [];
  let allmarket = await Supermarket.find();
  allmarket.forEach((x) => {
    ids.push(x._id);
  });

  await Supermarket.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $push: { items: item },
    },
    { multi: true }
  );

  return res.json({
    Data: item,
    message: "Item Created",
  });
};

exports.getAllItems = async (req, res, next) => {
  let items = await Items.find().populate("category", "name");
  return res.json({
    Data: items,
    message: "respond with a resource",
  });
};

exports.getItems = async (req, res, next) => {
  let items = await Items.findById(req.params.id).populate("category", "name");
  return res.json({
    Data: items,
    message: "Successfully.....!",
  });
};

exports.deleteItems = async (req, res, next) => {
  let items = await Items.findByIdAndDelete(req.params.id);

  let ids = [];

  let allmarket = await Supermarket.find();

  allmarket.forEach((x) => {
    let id = x.items.findIndex((e) => e === req.params.id);
    if (id === -1) {
      ids.push(x._id);
    }
  });

  await Supermarket.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $pull: { items: { _id: mongoose.Types.ObjectId(req.params.id) } },
    }
  );
  return res.json({
    Data: "items",
    message: "Deleted Successfully.....!",
  });
};

exports.updateItem = async (req, res, next) => {
  const result = await Supermarket.findOneAndUpdate(
    {
      "items._id": req.params.id,
      _id: req.body.s_id,
    },
    {
      $set: {
        "items.$.price": req.body.price,
      },
    },
    { new: true }
  );

  return res.json({
    data: result,
    message: "updated Successfully.....!",
  });
};

exports.updateItemData = async (req, res, next) => {
  await Items.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body
  );

  await Supermarket.updateMany(
    { "items._id": req.params.id },
    {
      $set: {
        "items.$.name": req.body.name,
        "items.$.category": req.body.category,
        "items.$.active": req.body.active,
      },
    },
    { multi: true }
  );

  return res.json({
    message: "updated Successfully.....!",
  });
};

exports.getApiKey = async (req, res, next) => {
  const apilist = await API.find();

  return res.json({
    data: apilist,
    message: "list",
  });
};
