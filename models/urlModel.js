const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    longUrl: String,
    urlCode: String,
    shortUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
