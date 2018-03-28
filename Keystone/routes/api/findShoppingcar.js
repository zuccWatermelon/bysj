var keystone = require('keystone');
var OrderItem = keystone.list('OrderItem');
var moment = require('moment');

var async = require('async');//异步的

exports = module.exports = function (req, res) {

    var returnMessag = {}; 
    async.parallel({//并行异步
        orderItems: function (done) {//customer是别名
            OrderItem.model.find()
                .populate('Cpu memory operateSystemType operateSystem systemHardDiskType dataHardDiskType')
                .where('status', '待提交')
                .where('userID', req.body.userID)
                // .limit(pageSize)
                // .skip((pageSelected - 1) * pageSize)
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

                orderItem.orderId = element._id;//默认的哈希值
                orderItem.name = '云主机';
                // orderItem.price = new Date().getTime();
                orderItem.period = element.period;
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
                orderItem.createdAt = element._.createdAt.format("YYYY-MM-DD");
                orderItem.endAt = element.createdAt;
                orderItem.endAt.setMonth(Number(orderItem.endAt.getMonth())+Number(orderItem.period));
                orderItem.endAt = moment(orderItem.endAt).format("YYYY-MM-DD");
                orderItem.price = 2 * orderItem.period * orderItem.Cpu * orderItem.memory * orderItem.dataHardDiskSize * orderItem.bandWidth;
                returnMessag.message.push(orderItem);
            });
        }
        // console.log(returnMessag);
        res.send(JSON.stringify(returnMessag));
    });
};  