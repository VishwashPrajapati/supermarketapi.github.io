const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, require: true },
  active: { type: Boolean },
});

module.exports = mongoose.model("Category", categorySchema);
