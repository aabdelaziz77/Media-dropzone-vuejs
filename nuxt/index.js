const { resolve } = require('path')

module.exports = function nuxtVueWebCam() {
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'media-dropzone.js'
  })
}

module.exports.meta = require('../package.json')
