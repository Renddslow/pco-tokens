const jwt = require('jsonwebtoken');

module.exports = (secret, people, type, identifier) => {
	return people.map(({ data }) => {
		const person = {
			id: data.id,
			first_name: data.attributes.first_name,
			last_name: data.attributes.last_name,
			avatar: data.attributes.avatar,
		};
		return {
			identifier,
			type,
			person,
			token: jwt.sign(person, secret),
		};
	})
};