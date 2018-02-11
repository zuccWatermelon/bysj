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

    console.log(cpu);
    console.log(memory);
    console.log(operateSystemType);
    console.log(operateSystem);
    console.log(systemHardDiskType);
    console.log(dataHardDiskType);
    console.log(dataHardDiskSize);
    console.log(bandWidth);
    console.log(status);

    if (telephone && password) {
        async.parallel({//并行异步
            customer: function (done) {//customer是别名
                Customer.model.findOne()
                    .where('telephone',telephone)//通过telephone和password两个条件定位出一个客户
                    .where('password', password)                
                    .exec(function (err, result) {
                        done(err, result);
                    });
                },
        }, function (err, result) {
            if (result.customer==null) {
                returnMessag.code = 0;
                returnMessag.message = "对不起，您输入账号或密码有误";
            } else {
                returnMessag.code = 1;
                returnMessag.message = "登录成功";
                returnMessag.customerID = result.customer._id;//默认的哈希值
                returnMessag.name = result.customer.name;//通过查出来的customer可以获取他的id和name
                returnMessag.telephone = result.customer.telephone;
                returnMessag.password = result.customer.password;
            }
            console.log(returnMessag);
            res.send(JSON.stringify(returnMessag));
            // var json = JSON.stringify({a: 'Hello', b: 'World'});
             //结果是 '{"a": "Hello", "b": "World"}'
        });
    } else {
        returnMessag.code = 0;
        returnMessag.message = "对不起，您输入账号或密码有误";
        res.send(JSON.stringify(returnMessag));
    }

};
