// Dependencies
const joi = require('joi');
// initialization of lib container
const lib = {};

 lib.RegData = async (user) => {
  const schema = joi.object({
    fullname: joi.string().required(),
    username: joi.string()
                 .alphanum()
                 .min(3)
                 .max(30)
                 .required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string()
                .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/))
                .message('Your password doesnt march the required pattern'),
  })
  try {
     const valRes = await schema.validateAsync(user);
    return valRes
  } catch(err) {
    throw (err.details[0].message)
  }
}

// Export of module
module.exports = lib