import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import url from 'rollup-plugin-url';
import alias from 'rollup-plugin-alias';
import { terser } from 'rollup-plugin-terser';

const namedExports = {
  'react': Object.getOwnPropertyNames(require('react')),
  'react-dom': Object.getOwnPropertyNames(require('react-dom')),
  'react-is': Object.getOwnPropertyNames(require('react-is')),
  'draft-js': Object.getOwnPropertyNames(require('draft-js')),
  'prop-types': Object.getOwnPropertyNames(require('prop-types'))
};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist-rollup/main.js',
    format: 'iife'
  },
  plugins: [
    alias({
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      resolve: ['.js', '/index.js'] 
    }),
    resolve(),
    babel({
      exclude: /node_modules(?!\/@kemsu)/,
    }),
    commonjs({
      namedExports
    }),
    postcss(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    url(),
    //terser()
  ]
};