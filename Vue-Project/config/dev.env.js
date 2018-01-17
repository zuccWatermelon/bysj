var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:"/api/",
  API_HOST1:"/netCloudUser/",      //用户登录
  API_HOST2:"/netCloudOrder/",     //订单及购物车
  API_HOST3:"/netCloudCustomer/",  //客户
  API_HOST4:"/netCloudOffer/",     //商品
})
