// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    // webpack编译输出的二级文件夹
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //使用过Source Map，可以用于还原真实的出错位置，帮助开发者更快的Debug。
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    //默认不打开开启gzip模式
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to 运行带有额外参数的build命令
    // View the bundle analyzer report after build finishes:  构建完成后查看捆绑分析器报告：
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off  设置为“true”或“false”，始终打开或关闭它
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8088,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api': {
      //   target: 'http://134.96.231.85:8090/',//设置你调用的接口域名和端口号 别忘了加http
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
      //   }
      // },
      '/netCloudUser': { //用户登录url
        target: 'http://134.96.231.86:8090/netCloudUser/',//设置你调用的接口域名和端口号 别忘了加http
        pathRewrite: {
          '^/netCloudUser': '/'
        }
      },
      '/netCloudOrder': { //订单及购物车
        target: 'http://134.96.231.87:8094/netCloudOrder/',//设置你调用的接口域名和端口号 别忘了加http
        // target:'http://134.96.231.87:8094',
        changeOrigin: true,
        pathRewrite: {
          '^/netCloudOrder': '/'
        }
      },
      '/netCloudCustomer': { //客户
        target: 'http://134.96.231.85:8094/netCloudCustomer/',
        changeOrigin: true,
        pathRewrite: {
          '^/netCloudCustomer': '/'
        }
      },
      '/netCloudOffer': { //商品以及产品
        target: 'http://134.96.231.85:8094/netCloudOffer/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/netCloudOffer': '/'
        }
      },
      '/netCloudBusiness': { //镜像配置
        target: 'http://134.96.231.88:8090/netcloud-businesscenter-web/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
        '^/netCloudBusiness': '/'
      }

   },

},
    // CSS Sourcemaps off by default because relative paths are "buggy" CSS默认关闭源代码，因为相对路径是“buggy”
    // with this option, according to the CSS-Loader README   使用此选项，根据CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,   在我们的经验中，他们通常按预期工作，
    // just be aware of this issue when enabling this option.   启用此选项时，请注意此问题。
    cssSourceMap: false
  }
}
