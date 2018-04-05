var keystone = require('keystone');

var Customer = keystone.list('Customer');
var async = require('async');//异步的

exports = module.exports = function (req, res) {
	var psw = req.body.psw;
    var returnMessag = {}; 
    var userID = req.body.userID;
    var pass = req.body.pass;

    console.log(userID)
    console.log(psw)
    console.log(pass)

	Customer.model.update({_id: userID,password: psw}, { password: pass },function(err,element){
        if(err){
            console.log(err);
        }
        console.log(element)
        if(element.nModified == 0){
        	if (element.n == 1) {
                console.log('新密码不得与原密码相同');
                returnMessag.code = 0;
                returnMessag.message = "新密码不得与原密码相同";
            }else if (element.n == 0) {
                console.log('密码修改失败，请输入正确的原密码');
                returnMessag.code = -1;
                returnMessag.message = "密码修改失败，请输入正确的原密码";
            }
        }else{
        	console.log('密码修改成功');
            returnMessag.code = 1;
        	returnMessag.message = "密码修改成功"
        }
        res.send(JSON.stringify(returnMessag));
    });
};
