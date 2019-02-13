const router = require('express').Router();
const path = require("path");
const isAuthenticated = require('../../middleware/isAuthenticated');


router.use(isAuthenticated);

router.route("/:username")
  .get((req, res) => {
  res.sendFile(path.join(__dirname, "../../public/html/index.html"))
  
});

module.exports = router;