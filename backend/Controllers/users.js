const Joi = require("joi");
const customError = require("../Helper/ErrorHandeler.js");

const schema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().messages({
    "string.email": "Invalid Email Format",
  }),
  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .label("password")
    .messages({
      "string.min": "Must have at least 8 characters",
      "object.regex": "Must have at least 8 characters",
      "string.pattern.base":
        "Password must include at least  special character,capital,small letter and number",
    }),
});

const validateUser = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const err = new customError(
      "validation error",
      442,
      error.details.map((Error) => {
        return { key: Error.context.key, message: Error.message };
      })
    );
    next(err);
  }
};

module.exports = validateUser;
