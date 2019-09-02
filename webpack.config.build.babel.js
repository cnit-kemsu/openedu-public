import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DuplicatesPlugin } from 'inspectpack/plugin';

export default {
  mode: 'development',
  target: 'web',

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          'src',
          'node_modules/@kemsu',
          'test',
        ].map(_ => path.resolve(__dirname, _)),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  optimization: {
    namedChunks: true,
    namedModules: false,
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@lib': path.resolve(__dirname, 'src/lib/'),
      '@views': path.resolve(__dirname, 'src/views/')
    }
  }
};