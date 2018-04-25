const express = require("express");
const Router = express.Router();
const models = require("./model");
const User = models.getModel("user");
const utils = require("utility");

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
    User.create({ username, type, password: md5Pwd(password) }, function(
      err,
      doc
    ) {
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

function md5Pwd(password) {
  const salt1 = "disk@adj123#sdfkja@gxq";
  const salt2 = "mask!sick0;sdfkja:zxc";
  return utils.md5(utils.md5(salt1 + password + salt2));
}

module.exports = Router;
