const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");
const dotenv = require("dotenv");

dotenv.config();

exports.createShortUrl = async (req, res) => {
  
  const longUrl = req.body.longUrl;
  const urlCode = req.body.urlCode;
  const baseUrl = process.env.BASE_URL;

  const customUrlCode = urlCode ? urlCode : shortId.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await urlModel.findOne({ longUrl: longUrl });
      if (url) {
        return res.status(409).json({
          message: "The url already exists in the database",
          data: url,
        });
      } else {
        // http://localhost:8000/appleIphone14
        const newShortUrl = baseUrl + "/" + customUrlCode;
        const newUrl = await urlModel.create({
          longUrl: req.body.longUrl,
          shortUrl: newShortUrl,
          urlCode: customUrlCode,
        });

        return res.status(201).json(newUrl);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json("Invalid long url");
  }
};
