import axios from 'axios';
import { Loading } from 'element-ui';

let loading;
// 添加请求拦截器，在请求调用，显示 ElementUI 的加载组件
axios.interceptors.request.use(function (config) {
  loading = Loading.service({ fullscreen: true ,text:'拼命加载中'});
  return config;
}, function (error) {
  // 处理错误请求
  return Promise.reject(error);
});

// 添加响应拦截器 ，请求结束后，关闭加载组件
axios.interceptors.response.use(function (response) {
  loading.close();
  return response;
}, function (error) {
  //处理响应错误
  return Promise.reject(error);
});
