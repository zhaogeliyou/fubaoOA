//导入path 
var path = require('path')

//导入那个自动生成index.html，并且导入bundle.js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/main.js', //打包的入口文件
  output:{ //打包之后的输出文件
    path: path.join(__dirname,'dist'),
    filename: 'bundle.js'
  },
  module: {
        loaders: [ //1.x的兼容写法，最好用rules
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|png|svg|gif)$/,
                loader: 'url-loader'
            }
        ]
  } ,
  plugins: [
    new HtmlWebpackPlugin({
        filename : 'index.html', //最终在内存中生成的文件名称，并且这个文件会在浏览器中自动打开
        template : 'template.html' //生成index.html的参照模版
    })
  ]
}