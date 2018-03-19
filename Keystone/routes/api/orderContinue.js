var keystone = require('keystone');

var order = keystone.list('OrderItem');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var returnMessag = {}; 
    var orderID = req.body.orderID;
    var period = req.body.period;

    // console.log(orderID);

    order.model.update({_id: orderID}, { period : period },function(err){
    	console.log(period);
        if(err){
            console.log(err)
        }
    });
    
    returnMessag.message = "续订成功，请稍后刷新查看";
    res.send(JSON.stringify(returnMessag));
};
