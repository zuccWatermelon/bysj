var keystone = require('keystone');
var Customer = keystone.list('Customer');

var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var telephone = req.body.telephone;
    var password = req.body.password;
    var name = req.body.name;
    var returnMessag = {}; 

    console.log(telephone);
    console.log(password);

    if (telephone) {
        async.parallel({//并行异步
            customer: function (done) {//customer是别名
                Customer.model.findOne()
                    .where('telephone',telephone)
                    .exec(function (err, result) {
                        done(err, result);
                    });
                },
        }, function (err, result) {
            if (result.customer==null) {
                returnMessag.code = 0;
                returnMessag.message = "注册成功";
                returnMessag.customerID = result.customer._id;//默认的哈希值
                returnMessag.name = result.customer.name;//通过查出来的customer可以获取他的id和name
                returnMessag.telephone = result.customer.telephone;
                returnMessag.password = result.customer.password;

                var newCustomer = new Customer.model({
                    name:name,
                    telephone:telephone,
                    password:password,
                })
                newCustomer.save(function(err) {
                    console.log(err)
                    // post已保存  
                });

            } else {
                returnMessag.code = 1;
                returnMessag.message = "注册失败，该用户已存在";
            }
            console.log(returnMessag);
            res.send(JSON.stringify(returnMessag));
            // var json = JSON.stringify({a: 'Hello', b: 'World'});
             //结果是 '{"a": "Hello", "b": "World"}'
        });
    } 

};
