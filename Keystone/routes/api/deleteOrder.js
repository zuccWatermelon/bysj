var keystone = require('keystone');
var order = keystone.list('OrderItem');

var async = require('async');//异步的
exports = module.exports = function (req, res) {
    var returnMessag = {}; 

    async.parallel({//并行异步
        order: function (done) {//order是别名
            order.model.findOne()
            .exec(function (err, result) {
                done(err, result);
            });
        },
    }, function (err, result) {
    });

    order.model.findById('item')//订单的哈希值
        .remove(function(err) {
        // post已删除
        });

    returnMessag.message = "删除订单成功";
    res.send(JSON.stringify(returnMessag));
};



