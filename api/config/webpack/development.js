process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

let webpackConfig = environment.toWebpackConfig()

webpackConfig.module.rules.push({
    test: /\.js$/,
    include: /node_modules[\\\/]@?reactflow/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator']
        }
    }
});

module.exports = webpackConfig

console.log(webpackConfig)
