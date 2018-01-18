/**
 * Created by acer on 2017/11/27.
 */

export default {
  userMap:function () {
    let user = {};
    if(window.sessionStorage && window.sessionStorage.getItem('user')){
      user = JSON.parse(window.sessionStorage.getItem('user'));
    }
    //用户id
    user.getStaffId = function () {
      return user.staffId;
    };
    //用户类型
    user.getStaffType = function () {
      return user.staffType;
    };
    //创建时间
    user.getCreateDate = function () {
      return user.staffType;
    };
    //创建人
    user.getCreateStaff = function () {
      return user.createStaff;
    };
    //生效时间effDate
    user.getEffDate = function () {
      return user.effDate;
    };
    //失效时间
    user.getExpDate = function () {
      return user.expDate;
    };
    //用户状态
    user.getStatusCd = function () {
      return user.statusCd;
    };
    //用户账号
    user.getSysUserCode = function () {
      return user.sysUserCode;
    };
    //用户名
    user.getSysUserName = function () {
      return user.sysUserName;
    };
    user.getOrgId = function () {
      return user.orgId;
    };
    //用户电话
    user.getMobile = function () {
      return user.mobile;
    };
    //用户邮箱
    user.getMail = function () {
      return user.mobile;
    };
    user.getSaleStaffNo = function () {
      return user.saleStaffNo;
    };


    return user;
  }
}
