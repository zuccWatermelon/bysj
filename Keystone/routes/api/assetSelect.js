var keystone = require('keystone');
var OrderItem = keystone.list('OrderItem');
var moment = require('moment');

var async = require('async');//异步的

exports = module.exports = function (req, res) {
    console.log(req.body);
    var cpu = req.body.cpu;
    var memory = req.body.memory;
    var operateSystemType = req.body.systemType;
    var operateSystem = req.body.operateSystem;
    var systemHardDiskType = req.body.systemHardDiskType;
    var dataHardDiskType = req.body.dataHardDiskType;
    var dataHardDiskSize = req.body.dataHardDiskSize;
    var bandWidth = req.body.bandWidth;
    var status = req.body.status;
    var period = req.body.period;
    var userID = req.body.userID;
    var currentPage = req.body.currentPage;

    if(currentPage == null || currentPage ==''){
        currentPage = 1;
    }

    var returnMessag = {};
    async.parallel({//并行异步
        entityNumber:function(done){
            var number = OrderItem.model.count();
                if (cpu != null && cpu !=   `` ) {
                    number.where('Cpu',cpu);//左边是数据库里的属性名，右边是变量名
                }
                if (period != null && period != ``) {
                    number.where('period',period);
                }
                if (operateSystemType != null && operateSystemType != ``) {
                    number.where('operateSystemType',operateSystemType);
                }
                if (status != null && status != ``) {
                    number.where('status',status);
                }else {
                    number.where('status').in(['已完成',['待审批']])
                }
                if (memory != null && memory != ``) {
                    number.where('memory',memory);
                }
                if (systemHardDiskType != null && systemHardDiskType != ``) {
                    number.where('systemHardDiskType',systemHardDiskType);
                }
                if (dataHardDiskType != null && dataHardDiskType != ``) {
                    number.where('dataHardDiskType',dataHardDiskType);
                }
                number.where('userID', req.body.userID)
                number.exec(function (err, result) {
                    done(err, result);
                });
            },
        orderItems: function (done) {//customer是别名
            var order = OrderItem.model.find();
                order.populate('Cpu memory operateSystemType operateSystem systemHardDiskType dataHardDiskType')
                if (cpu != null && cpu !=   `` ) {
                    order.where('Cpu',cpu);//左边是数据库里的属性名，右边是变量名
                }
                if (period != null && period != ``) {
                    order.where('period',period);
                }
                if (operateSystemType != null && operateSystemType != ``) {
                    order.where('operateSystemType',operateSystemType);
                }
                if (status != null && status != ``) {
                    order.where('status',status);
                }else {
                    order.where('status').in(['已完成',['待审批']])
                }
                if (memory != null && memory != ``) {
                    order.where('memory',memory);
                }
                if (systemHardDiskType != null && systemHardDiskType != ``) {
                    order.where('systemHardDiskType',systemHardDiskType);
                }
                if (dataHardDiskType != null && dataHardDiskType != ``) {
                    order.where('dataHardDiskType',dataHardDiskType);
                }
                order.limit(5)
                order.skip((currentPage - 1) * 5)
                order.where('userID', req.body.userID)
                order.exec(function (err, result) {
                    done(err, result);
                });
            },
    }, function (err, result) {
        if (result.orderItems==null) {
            returnMessag.message = "资产为空";
        } else {
            returnMessag.message = [];

            result.orderItems.forEach(function(element){
                var orderItem = {};

                // console.log(element);
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
        returnMessag.totalCnt = result.entityNumber;
        res.send(JSON.stringify(returnMessag));
    });
};  