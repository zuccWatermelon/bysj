import Vue from 'vue'

var ORDER_STATUS = {
    order_not_approved: {
      statusCd: "1",
      statusName: "未审批",
    },
    order_not_approving: {
      statusCd: "2",
      statusName: "审批中",
    },
    order_not_approving: {
      statusCd: "3",
      statusName: "审批通过",
    },
    order_approve_refused: {
      statusCd: "4",
      statusName: "审批未通过",
    },
    order_resource_not_check: {
      statusCd: "15",
      statusName: "资源未审核",
    },
    order_resource_checking: {
      statusCd: "10",
      statusName: "资源审核中",
    },
    order_resource_checked: {
      statusCd: "11",
      statusName: "资源审核通过",
    },
    order_resource_refused: {
      statusCd: "12",
      statusName: "资源审核不通过",
    },
    order_transforming: {
      statusCd: "13",
      statusName: "转商处理中",
    },
    order_transformed: {
      statusCd: "14",
      statusName: "转商完成",
    },
  }

  /**(全局函数)获取statusCd对应的状态名**/
  export default{
     getOrderStatus(statusCd) {
       var result = "";

       $.each(ORDER_STATUS, function (index, item) {
         if (item.statusCd == statusCd) {
           result = this.statusName;
         }
       })
       return result;
     },
  }


