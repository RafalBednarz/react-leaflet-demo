module.exports = {
  babelrc: false,
  cacheDirectory: true,
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ].map(require.resolve),
  plugins: [
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread',
    "@babel/plugin-transform-runtime"
  ]
}
