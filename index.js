const createAPI = require('./lib/createAPI');
const withEmail = require('./lib/withEmail');

module.exports = (options) => {
	if (!options.pcoAppId || !options.pcoSecret) {
		throw new Error('Options must provide both an `pcoAppId` and a `pcoSecret` to connect to Planning Center. https://developer.planning.center/docs/#/introduction/authentication');
	}

	if (!options.secret) {
		throw new Error('A secret must be provided to tokenize user information. This will be needed to verify the tokens.');
	}

	const api = createAPI(options);

	return {
		withEmail: withEmail(api, options.secret),
	};
};
