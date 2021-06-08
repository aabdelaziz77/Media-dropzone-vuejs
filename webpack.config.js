var path = require("path");
process.traceDeprecation = true;

var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { version } = require("../package.json");


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "index.js",
    library: "media-dropzone",
    libraryTarget: "umd"
  },
  
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        
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
                modules : {
                  
                  // customize generated class names
                  //localIdentName: '[local]_[hash:base64:8]'
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
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        exclude: /node_modules/,
        loader: "file-loader"
    },
    {
        test: /\.(eot|ttf)$/,
        loader: "file-loader",
    },
    ]
  },
  externals: {
    vue: "vue"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      
      'process.env.NODE_ENV' : JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};
