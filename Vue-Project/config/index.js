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

    // CSS Sourcemaps off by default because relative paths are "buggy" CSS默认关闭源代码，因为相对路径是“buggy”
    // with this option, according to the CSS-Loader README   使用此选项，根据CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,   在我们的经验中，他们通常按预期工作，
    // just be aware of this issue when enabling this option.   启用此选项时，请注意此问题。
    cssSourceMap: false
  }
}
