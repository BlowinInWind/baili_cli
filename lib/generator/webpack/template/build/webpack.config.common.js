const chalk = require('chalk');
const fs = require('fs');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
<%_ if (linter) { _%>
const ESLintPlugin = require('eslint-webpack-plugin');
<%_ } _%>
// 判断环境
const isDev = process.env.NODE_ENV === 'development';
const config = require('./config');
// 检查有没有ts文件
const useTypeScript = fs.existsSync(config.tsConfig);

module.exports = {
  // entry: resolve('../src/main.js'),
  entry: {
    app: config.appIndexJs
  },

  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',

  cache: {
      type: 'filesystem'
  },


  resolve: {
    extensions: ['tsx', 'ts', 'jsx', 'js', 'json']
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),

    // 目录开头为 @ 符号，文件开头为 $ 符号
    plugins: [
        // 将 tsconfig.json 中的路径配置映射到 webpack 中
        new TsconfigPathsPlugin({
            configFile: './tsconfig.json'
        })
    ]
  },


  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
            'cache-loader',
            {
                loader: 'thread-loader'
            },
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }
        ],
        exclude: /node_modules/,
        include: config.appSrc
      },
      {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
              filename: 'app/images/[name]_[hash:7].[ext]'
          },
          parser: {
              dataUrlCondition: {
                  maxSize: 1000 * 1024 // 4kb
              }
          }
      },
      {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
          type: 'asset/resource',
          generator: {
              filename: 'app/files/[name]_[hash:7].[ext]'
          }
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
              filename: 'app/fonts/[name]_[hash:7].[ext]'
          }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

    plugins: [
       // 显示打包时间
    new ProgressBarPlugin({
        format: `${chalk.green('Progressing')} [:bar] ${chalk.green.bold(
            ':percent'
        )} (:elapsed seconds)`
    }),

    new ForkTsCheckerWebpackPlugin({
        // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
        async: false,
        typescript: { memoryLimit: 4096 }
        // formatter: typescriptFormatter
    }),

    // 将TypeScript类型检查错误以弹框提示
    // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    new ForkTsCheckerNotifierWebpackPlugin({
        title: 'TypeScript',
        excludeWarnings: true,
        skipSuccessful: true
    }),

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'index.html',
      template: config.appHtml,
      favicon: config.favicon,
      inject: true,
      // cache: true,
      minify: {
          removeComments: true,
          collapseWhitespace: true, // 折叠空行
          removeAttributeQuotes: true, // 删除双引号
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
      },
      chunksSortMode: 'auto'
    }),

    <%_ if (linter) { _%>
    new ESLintPlugin({
      context: path.resolve(__dirname, '../'),
      emitError: !isDev,
      emitWarning: !isDev,
      failOnError: !isDev,
      extensions: ['ts', 'tsx', 'js', 'jsx'],
      threads: true,
      exclude: 'node_modules',
      fix: false // 是否自动修复
    }),
    <%_ } _%>
  ],
};
