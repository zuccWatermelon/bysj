var keystone = require('keystone');
var order = keystone.list('OrderItem');
var async = require('async');//异步的
var dataAnalyse = function(obj){
    var data = Object.keys(obj)[0];
    data = JSON.parse(data);
    return data;
}
exports = module.exports = function (req, res) {
    var item = null;
    var returnMessag = {}; 
    var data = req.body ? dataAnalyse(req.body) : null;
    item = data ? data.orderID : null;
    if(!item){
        return;
    }
    //订单的哈希值
    order.model.findById(item).remove(function(err,result) {
        returnMessag.message = "删除订单成功";
        res.send(returnMessag);
    });
};



