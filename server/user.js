const express = require("express");
const Router = express.Router();
const models = require("./model");
const User = models.getModel("user");
const utils = require("utility");
const _filter = { password: 0, __v: 0 };

Router.get("/list", function(req, res) {
    User.find({}, function(err, doc) {
        return res.json(doc);
    });
});

// Router.post("/update", function(req, res) {
//     const userid = req.cookie.userid;
// });

Router.post("/register", function(req, res) {
    const { username, password, type } = req.body;
    User.findOne({ username }, function(err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: "用户名已存在..." });
        }

        const userModel = new User({
            username,
            type,
            password: md5Pwd(password)
        });
        userModel.save(function(err, doc) {
            if (err) {
                return res.json({ code: 1, msg: "服务器出错，请稍后再试..." });
            }
            const { user, type, _id } = doc;
            res.cookie("userid", _id);
            return res.json({ code: 0, data: { user, type, _id } });
        });
    });
});

Router.post("/login", function(req, res) {
    const { username, password } = req.body;
    User.findOne({ username, password: md5Pwd(password) }, _filter, function(
        err,
        doc
    ) {
        if (!doc) {
            return res.json({ code: 1, msg: "用户名或者密码错误..." });
        }
        res.cookie("userid", doc._id);
        return res.json({ code: 0, data: doc });
    });
});
Router.get("/info", function(req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 });
    }
    User.findOne({ _id: userid }, _filter, function(err, doc) {
        if (err) {
            return res.json({ code: 1, msg: "后端出错了..." });
        }
        if (doc) {
            return res.json({ code: 0, data: doc });
        }
    });
});

function md5Pwd(password) {
    const salt1 = "disk@adj123#sdfkja@gxq";
    const salt2 = "mask!sick0;sdfkja:zxc";
    return utils.md5(utils.md5(salt1 + password + salt2));
}

module.exports = Router;
