var keystone = require('keystone');
var Customer = keystone.list('Customer');

var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var telephone = req.body.telephone;
    var password = req.body.password;

    var returnMessag = {}; 

    if (telephone && password) {
        async.parallel({//并行异步
            password: function (done) {
                password.model.findOne()
                    .where('password', password)
                    .where('telephone',telephone)
                    .exec(function (err, result) {
                        done(err, result);
                    });
                },
        }, function (err, result) {
            if (!result.telephone || !result.password) {
                returnMessag.code = 0;
                returnMessag.message = "对不起，您输入账号或密码有误";
            } else {
                returnMessag.code = 1;
                returnMessag.message = "登录成功";
                returnMessag.customerID = result._id;

            }
            res.send(JSON.stringify(returnMessag));
            // var json = JSON.stringify({a: 'Hello', b: 'World'});
             //结果是 '{"a": "Hello", "b": "World"}'
        });
    } else {
        returnMessag.code = 0;
        returnMessag.message = "对不起，您输入账号或密码有误";
        res.send(JSON.stringify(returnMessag));
    }

};
