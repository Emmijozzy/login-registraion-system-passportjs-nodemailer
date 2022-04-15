// Dependencies
const crypto = require('crypto');

// initialization of lib container
const lib = {};

// generate salt and hash of password
lib.genSaltHash = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return {
    salt,
    hash
  }
}

lib.comparePassword = (password, hash, salt) => {
  const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashToVerify
}

// export of module
module.exports = lib