const express = require("express");
const Router = express.Router();
const models = require("./model");
const User = models.getModel("user");

Router.get("/list", function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

Router.post("/register", function(req, res) {
  const { username, password, type } = req.body;
  User.findOne({ username }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名已存在..." });
    }
    User.create({ username, password, type }, function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "服务器出错，请稍后再试..." });
      }
      return res.json({ code: 0 });
    });
  });
});

Router.get("/info", function(req, res) {
  return res.json({ code: 1 });
});

module.exports = Router;
