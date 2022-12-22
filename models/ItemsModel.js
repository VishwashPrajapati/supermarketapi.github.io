const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  name: { type: String, require: true },
  category: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: "Category",
  },
  price: { type: String, require: true },
  active: { type: Boolean },
});

module.exports = mongoose.model("Items", itemsSchema);
