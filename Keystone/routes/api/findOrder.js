var keystone = require('keystone');
var OrderItem = keystone.list('OrderItem');

var async = require('async');//异步的

exports = module.exports = function (req, res) {

	var returnMessag = {}; 
	async.parallel({//并行异步
    	orderItems: function (done) {//customer是别名
        	OrderItem.model.find()
                .populate('Cpu memory operateSystemType operateSystem systemHardDiskType dataHardDiskType')
            	.exec(function (err, result) {
               		done(err, result);
            	});
        	},
	}, function (err, result) {
    	if (result.orderItems==null) {
        	returnMessag.message = "购物车为空";
    	} else {
            returnMessag.message = [];

            result.orderItems.forEach(function(element){
                var orderItem = {};

                console.log(element);
                orderItem.orderId = element._id;//默认的哈希值
                orderItem.name = '云主机';
                orderItem.price = new Date().getTime();
                orderItem.num = 1;
                orderItem.Cpu = element.Cpu.name;
                orderItem.memory = element.memory.name;
                orderItem.operateSystem = element.operateSystem.name;
                orderItem.systemType = element.operateSystemType.name;
                orderItem.systemHardDiskType = element.systemHardDiskType.name;
                orderItem.dataHardDiskType = element.dataHardDiskType.name;
                orderItem.dataHardDiskSize = element.dataHardDiskSize;
                orderItem.bandWidth = element.bandWidth;
                orderItem.status = element.status;
                orderItem.createdAt = element._.createdAt .format('YYYY-MM-DD HH:MM:SS')

                returnMessag.message.push(orderItem)
            });
    	}
    	// console.log(returnMessag);
    	res.send(JSON.stringify(returnMessag));
    });
};  