// 引入 path 模块
const path = require("path");
// 引入 html 插件
const HtmlWebPackPlugin = require("html-webpack-plugin")
// webpack中的所有的配置信息都应该写在module.exports中
// 暴露出去
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 搭建环境 生产环境
  "mode": "production",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve('./dist'),
    // 打包后文件的文件
    filename: "bundle.js",
    // 自动清除 生成的根目录下文件
    clean: true,
    environment: {
      // 不使用箭头函数
      arrowFunction: false
    }
  },
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      // 处理ts
      {
        // test 处理css
        test: /\.ts$/,
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              //  设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      // "ie >= 7"
                      "browsers": ["last 2 versions"]
                    },
                    // 指定 corejs 的版本  可以解决api问题 如promise ie没有
                    // babel 解决语法问题如 const 变 var
                    "corejs": "3",
                    // 使用corejs的方式 "usage表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // 使用ts-loader处理文件  谁在后面 谁先执行
          "ts-loader"
        ],
        // 指定排除的文件夹
        exclude: /node_modules/
      },
      // 处理less
      {
        test:/\.less$/,
        use:[
          "style-loader",
          "css-loader",
          // 引入postcss 处理兼容 css
          {
            loader:"postcss-loader",
            options:{
              postcssOptions:{
                plugins:[
                  [
                    "postcss-preset-env",
                    {
                      browsers:"last 2 version"
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  // 配置 webpack 插件
  plugins: [
    // 自动创建html
    new HtmlWebPackPlugin({
      // title:"自定义title",
      // 使用模板生成
      template: "./src/index.html"
    }),
  ],
  // 用来设置引用模块
  resolve: {
    // 可以作为模块的后缀
    extensions: ['.ts', '.js']
  }
}