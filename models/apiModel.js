const mongoose = require("mongoose");

const apiSchema = mongoose.Schema({
  api: { type: String },
});

module.exports = mongoose.model("Api", apiSchema);
