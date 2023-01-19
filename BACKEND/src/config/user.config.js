const joi = require("joi");
const { joiPassword } = require("joi-password");

const userSchema = joi.object({
  username: joi.string().min(4).max(20).trim().required(),
  email: joi.string().email().trim().lowercase().required(),
  password: joiPassword
    .string()
    .min(8)
    .minOfLowercase(4)
    .minOfUppercase(1)
    .minOfNumeric(2)
    .minOfSpecialCharacters(2)
    .noWhiteSpaces()
    .messages({
      "password.minOfUppercase":
        "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters":
        "{#label} should contain at least {#min} special character",
      "password.minOfLowercase":
        "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric":
        "{#label} should contain at least {#min} numeric character",
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
    }),
});
module.exports = { userSchema };
