/**
 *
 * @param {string} params.clientId
 * @param {string} params.username
 * @param {Buffer} params.password
 * @param {string: [string, string]} credentials
 * @returns {Boolean}
 */
function validateCredentials(params, creds) {
  const clientId = params.clientId;
  const username = params.username;
  const password = params.password.toString();
  const credentials = creds[clientId];

  if (!credentials) {
    return false;
  }

  return username === credentials[0] && password === credentials[1];
}

module.exports = { validateCredentials };
