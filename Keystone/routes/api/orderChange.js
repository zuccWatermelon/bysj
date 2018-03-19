var keystone = require('keystone');

var order = keystone.list('OrderItem');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var status = req.body.status;
    var returnMessag = {}; 
    var orderID = req.body.orderID;

    // console.log(orderID);

    order.model.update({_id: orderID}, { status: "待提交" },function(err){
        if(err){
            console.log(err)
        }
    });
    
    returnMessag.message = "请到购物车进行修改订单";
    res.send(JSON.stringify(returnMessag));
};
