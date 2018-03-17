var keystone = require('keystone');

var order = keystone.list('OrderItem');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
    var CPU = req.body.CPU;
    var memory = req.body.memory;
    var operateSystemType = req.body.operateSystemType;
    var operateSystem = req.body.operateSystem;
    var systemHardDiskType = req.body.systemHardDiskType;
    var dataHardDiskType = req.body.dataHardDiskType;
    var dataHardDiskSize = req.body.dataHardDiskSize;
    var bandWidth = req.body.bandWidth;
    var status = req.body.status;
    var period = req.body.period;
    var orderID = req.body.orderID;
    var returnMessag = {}; 

    console.log(CPU);

    order.model.update(
        { _id : orderID }, 
        { status : "已完成" ,
         Cpu : CPU ,
         memory : memory ,
         operateSystemType : operateSystemType ,
         operateSystem : operateSystem ,
         systemHardDiskType : systemHardDiskType ,
         dataHardDiskType : dataHardDiskType ,
         dataHardDiskSize : dataHardDiskSize ,
         bandWidth : bandWidth ,
         period : period
        },

        function(err,element){
        if(err){
            console.log(err)
        }
    });
    returnMessag.message = "订单提交成功";
    res.send(JSON.stringify(returnMessag));
};
