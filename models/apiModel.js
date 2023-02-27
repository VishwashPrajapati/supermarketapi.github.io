const mongoose = require("mongoose");

const apiSchema = mongoose.Schema({
  api: { type: String, require: true },
});

module.exports = mongoose.model("Api", apiSchema);
