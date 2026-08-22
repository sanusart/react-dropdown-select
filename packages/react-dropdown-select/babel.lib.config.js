const addJsExtension = () => ({
	name: 'add-js-extension',
	visitor: {
		'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(path) {
			const source = path.node.source;
			if (!source || !/^\.\.?\//.test(source.value)) return;
			if (!/\.[a-zA-Z0-9]+$/.test(source.value)) {
				source.value = `${source.value}.js`;
			}
		},
	},
});

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				modules: false,
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
		'minify',
	],
	plugins: [
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
		addJsExtension,
	],
};
