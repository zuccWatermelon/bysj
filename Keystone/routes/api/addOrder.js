var keystone = require('keystone');

var order = keystone.list('OrderItem');
var cpu =  keystone.list('Cpu');
var memory = keystone.list('Memory');
var operatesystemtype = keystone.list('OperateSystemType');
var operatesystem = keystone.list('OperateSystem');
var hardDiskType = keystone.list('HardDiskType');
var customer = keystone.list('Customer');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var cpu = req.body.cpu;
    var memory = req.body.memory;
    var operateSystemType = req.body.operateSystemType;
    var operateSystem = req.body.operateSystem;
    var systemHardDiskType = req.body.systemHardDiskType;
    var dataHardDiskType = req.body.dataHardDiskType;
    var dataHardDiskSize = req.body.dataHardDiskSize;
    var bandWidth = req.body.bandWidth;
    var status = req.body.status;
    var returnMessag = {}; 
    var newOrder = new order.model({
            Cpu: '5a7970d6bc9a5b0370dae3a8',
            memory: '5a7970f5bc9a5b0370dae3ae',
            operateSystem:'5a79718dbc9a5b0370dae3b9',
            operateSystemType:'5a79717cbc9a5b0370dae3b7',
            systemHardDiskType:'5a7971b5bc9a5b0370dae3bc',
            dataHardDiskType:'5a7971b5bc9a5b0370dae3bc',
            dataHardDiskSize:'40G',
            bandWidth:'1m',
            status:'待提交'
    })
// if (shouldBePublished) {
//     newOrder.state = 'published';
// }
    newOrder.save(function(err) {
        // post已保存  
    });
    returnMessag.message = "添加订单成功";
    res.send(JSON.stringify(returnMessag));
};
