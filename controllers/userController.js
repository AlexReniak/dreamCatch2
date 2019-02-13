const db = require("../models");

module.exports = {

  findUser: function(req, res) {
    db.User
      .findOne({
        attributes: ["id", "first_name", "last_name", "full_name", "username"],
        where: {
          username: req.params.username
        },
        // include: [db.UserDreams]
      })
      .then(userDB => res.json(userDB))
      .catch(err => console.log(err));
  },

  registerUser: function (req, res) {
    db.User
      .create(req.body)
      .then(function (userInfo) {
        req.login(userInfo, function (err) {
          if (err) {
            throw err;
          }
          console.log(req.user)
          return res.json("/")
        })
      })
      .catch(err => console.log(err));
  },

  login: function(req, res) {
    console.log(req.user);
    res.json(`/dashboard/${req.user.username}`);
  },

  delete: function(req, res) {
    db.User
      .destroy({
        where: {
          username: req.params.username
        }
      })
      .then(userDB => req.json(userDB))
      .catch(err => console.log(err));
  }
};

