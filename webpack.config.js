const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ProvidePlugin, DefinePlugin } = require('webpack')

const mode = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

module.exports = (env) => {
  let APAC_URL = 'http://localhost:8080'
  switch (env.profile) {
    case 'local':
      APAC_URL = 'http://localhost:8080'
      break
    case 'develop':
      APAC_URL = 'http://121.165.242.201:12001'
      break
    case 'production':
      APAC_URL = 'http://3.38.220.108:8080'
      break
    default:
      throw new Error('undefined profile')
  }
  return {
    mode: mode,
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx')
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      }, {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        templateParameters: {
          env: mode === 'production' ? '' : '[DEV]'
        },
        minify: mode === 'production' ? { collapseWhitespace: true, removeComments: true } : false
      }),
      new CleanWebpackPlugin(),
      new ProvidePlugin({ process: 'process/browser' }),
      new DefinePlugin({
        APAC_URL: JSON.stringify(APAC_URL)
      })
    ],
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      open: true
    }
  }
}
