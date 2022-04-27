const { environment } = require('@rails/webpacker');

environment.loaders.delete('nodeModules');

environment.loaders.append('typescript', {
    test: /.(ts|tsx)$/,
    loader: 'ts-loader'
});

module.exports = environment;
