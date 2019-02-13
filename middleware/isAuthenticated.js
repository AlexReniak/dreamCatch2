module.exports = function (req, res, next) {
  console.log("You got authentication working!");
  if (req.user) {
    return next();
  }
  res.redirect("/")
};