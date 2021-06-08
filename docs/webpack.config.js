var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { version } = require("../package.json");

module.exports = {
  mode: "development",
  entry: "./docs/src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              
              options: {
                // enable CSS Modules
                sourceMap: true,
                  importLoaders: 2,
                  esModule: false,
                modules : {
                  
                  // customize generated class names
                  localIdentName: '[local]_[hash:base64:8]'
               } 
              }
            }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          'vue-svg-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
        },
      },
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      mylib: path.resolve(__dirname, '../src')
    }
  },
  devServer: {
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version),
      "process.env": "'development'"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version),
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
