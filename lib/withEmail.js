const { validate } = require('isemail');

const tokenizePeople = require('./tokenizePeople');

module.exports = (api, secret) => async (email) => {
	if (!email || !validate(email)) {
		throw new Error('A valid email is required to create a token.');
	}

	const emails = await api('/emails', {
		where: {
			address: email,
		},
	});

	const people = await Promise.all(emails.data.map(({ id }) => api(`/emails/${id}/person`)));

	return tokenizePeople(secret, people, 'email', email);
};
