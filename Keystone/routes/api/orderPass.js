var keystone = require('keystone');

var order = keystone.list('OrderItem');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var orderID = req.body.orderID;
    var returnMessag = {}; 

    order.model.update(
        { _id : orderID }, 
        { status : "已完成"},
        function(err,element){
            if(err){
                console.log(err)
            }
            returnMessag.message = "订单提交成功";
            res.send(JSON.stringify(returnMessag));
        }
    );
};
