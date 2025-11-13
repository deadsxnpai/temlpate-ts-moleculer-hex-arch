module.exports = {
	apps: [
		{
			name: "effective-contract-service",
			script: "./node_modules/.bin/moleculer-runner --config dist/moleculer.config.js",
			watch: false,
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
