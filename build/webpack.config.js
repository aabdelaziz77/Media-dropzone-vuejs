var path = require("path");
process.traceDeprecation = true;

var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { version } = require("../package.json");


module.exports = {
  watch: true,
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "index.js",
    library: "media-dropzone-vuejs",
    libraryTarget: "umd"
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
  externals: {
    vue: "vue"
  },
  resolve: {
    extensions: ['.json', '.js', '.vue','.ts'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
    },
    fallback: { "https": false }
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
