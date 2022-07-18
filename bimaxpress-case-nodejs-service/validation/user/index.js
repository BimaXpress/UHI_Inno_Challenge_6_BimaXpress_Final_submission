const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

module.exports = {
  userSchema,
};
