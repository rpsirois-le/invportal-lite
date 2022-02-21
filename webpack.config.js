const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const _paths = {
  src: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
  template: path.join(__dirname, "templates/template.html")
}

const htmlConfig = {
  title: 'react-env',
  template: _paths.template,
}

const plugins = [
  new HtmlWebPackPlugin(htmlConfig)
]

const target = 'web'
const entry = _paths.src
const output = {
  filename: "bundle.js",
  path: _paths.build
}

const rules = [
  {
    test: /\.(js|jsx|jsy)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        //plugins: [ 'transform-react-jsx', 'jsy-lite' ]
        presets: [ 'react', 'jsy' ]
    }
  },
  {
    test: /\.styl$/,
    use: ["style-loader", "css-loader", "stylus-loader"]
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  }
  , { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
]


module.exports = {
  entry, output, plugins,
  devtool: "source-map",
  module: { rules }
}
