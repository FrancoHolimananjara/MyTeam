const joi = require("joi");

const taskSchema = joi.object({
  title: joi.string().min(4).max(20).trim().required(),
});
module.exports = { taskSchema };
