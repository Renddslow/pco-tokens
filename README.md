# PCO Tokens

[![npm version](http://img.shields.io/npm/v/pco-tokens.svg?style=flat)](https://npmjs.org/package/pco-tokens "View this project on npm")

A quick way to tokenize user data from your Planning Center Online database. This is useful for doing email/sms-based authentication where you want Planning Center to be your primary source of truth.

## Install
```
$ yarn add pco-tokens jsonwebtoken
```

## Usage
```js
const pcoTokens = require('pco-tokens')({
  pcoAppId: '<SOME_APP_ID>',
  pcoSecret: '<SOME_SECRET>',
  secret: '<SUPER_SECRET_TOKENIZATION_STRING>',
});

(async () => {
	await pcoTokens.withEmail('example@example.com');
})();
```

## API

*A note up top, in order to use this package you will need to have created a Personal Access Token with Planning Center Online, not an application. [Read more.](https://developer.planning.center/docs/#/introduction/authentication)*

### pcoTokens(options)

#### options
Type: `Object`

##### pcoAppId
*Required*

Type: `string`

Your [Planning Center App ID](https://api.planningcenteronline.com/oauth/applications).

##### pcoSecret
*Required*

Type: `string`

Your [Planning Center Secret](https://api.planningcenteronline.com/oauth/applications).

##### secret
*Required*

Type: `string`

A super-secret key that your token will be built off of. This should be kept super-secret and stored so that you can verify the tokens later on.

### pcoTokens.withEmail(email)

Get a list of tokens from a user's email address.

#### email

*Required*

Type: `string`

A valid email address.

### Token Response

All `with*` methods return an array of objects in the following format:

```
{
    type: 'email' | 'phone',
    identifier: '<SUPPLIED EMAIL OR PHONE NUMBER>',
    token: '<SIGNED JSONWEBTOKEN>',
    person: {
        id: '<DATA FROM PCO>',
        first_name: '<DATA FROM PCO>',
        last_name: '<DATA FROM PCO>',
        avatar: '<DATA FROM PCO>',
    }
}
```

For every matching individual, you will receive a token as well as personally identifiable information of that individual. This is useful when you wish to populate an email with a list of people when the email is associated with multiple persons.

## Verifying the Tokens

In order to run `pco-tokens` you will need to have `jsonwebtoken` installed. `jsonwebtoken` makes it easy to verify a token.

```js
const jwt = require('jsonwebtoken');

const SECRET = '<YOUR SECRET THAT YOU TOKENIZED THE USER WITH>';

module.exports = (req, res) => {
    const { token } = req.query;
    
    if (!token) {
    	res.writeHead(401);
    	return res.end();
    }
    
    try {
      const person = jwt.verify(token, SECRET);
      
      res.setHeader('Content-Type', 'text/html');
      return res.end(`<h1>Hello, ${person.first_name}!</h1>`);	
    } catch (e) {
    	res.writeHead(401);
    	return res.end();
    }
}
```
