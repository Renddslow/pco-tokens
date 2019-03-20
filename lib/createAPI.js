const got = require('got');
const qs = require('qs');

module.exports = ({ pcoAppId, pcoSecret }) => (endpoint, query, options) => {
	const baseURL = 'https://api.planningcenteronline.com/people/v2';
	const url = query ?
		`${baseURL}${endpoint}?${qs.stringify(query, { encode: false })}` :
		`${baseURL}${endpoint}`;

	return got(url, Object.assign({}, options, {
		auth: `${pcoAppId}:${pcoSecret}`,
	})).then((data) => JSON.parse(data.body));
};
