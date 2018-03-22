var keystone = require('keystone');

var Customer = keystone.list('Customer');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
	var psw = req.body.psw;
    var returnMessag = {}; 
    var acc = req.body.acc;
    var pass = req.body.pass;

	Customer.model.update({telephone: acc}, { password: pass },function(err,element){
        if(err){
            console.log(err);
        }
        console.log(element)
        if(element.nModified == 0){
            console.log('该用户不存在，请输入正确的用户账号');
            returnMessag.message = "该用户不存在，请输入正确的用户账号";
        }else{
            console.log('密码修改成功');
            returnMessag.message = "密码修改成功"
        }
        res.send(JSON.stringify(returnMessag));
    });
};
