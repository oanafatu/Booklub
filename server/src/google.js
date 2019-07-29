const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('39669963550-ej271uev3v1lfjts7oope1aq2dmu46b7.apps.googleusercontent.com');

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '39669963550-ej271uev3v1lfjts7oope1aq2dmu46b7.apps.googleusercontent.com', 
  });
  const payload = ticket.getPayload();
  let userData = {};
  userData.id = payload['sub'];
  userData.email = payload['email'];
  userData.firstName = payload['given_name'];
  userData.lastName = payload['family_name'];

  return userData;
}

module.exports.verify = verify;