const express = require("express");
const router = express.Router();
const redirectionController = require("../controllers/redirectionController");

router.get("/:code", redirectionController.getShortUrl);

module.exports = router;
