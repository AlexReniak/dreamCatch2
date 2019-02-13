const router = require("express").Router();
const htmlRoutes = require("./htmlRoutes");
const authRoutes = require("./authRoutes")

router.use("/", htmlRoutes);
router.use("/dashboard", authRoutes)

module.exports = router;