const path = require('path');

module.exports = {
	// Fichier d'entrée
	entry: './js/index.js',
	// Fichier de sortie
	output: {
		path: path.resolve(__dirname, '../../../1.0-reactagram-bootstrap/demarrage/site/public/js'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/, // tous les fichiers .js
				exclude: /node_modules/, // sauf le dossier node_modules
				use: { // seront transpilés par babel
					loader: 'babel-loader',
					options: {
						cacheDirectory: true // accélère la génération des JS en cachant les transpilations
					}
				}
			}
		]
	},
	devtool: 'source-map',
	externals: {
		'config': '__REACTAGRAM_CONFIG__'
	}
}