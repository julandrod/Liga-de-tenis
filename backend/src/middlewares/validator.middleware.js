/**
 * Validate the schemas built in express-validator
 * @param {Schema} schema schema built with express-validator
 * @returns response with all errors if are any or pass to the next process if there is no errors
 *
 * @example
 * router.post("/users", validatorMiddleware(testSchema), registerController)
 */
const { checkSchema, validationResult } = require("express-validator");

const validatorMiddleware = (schema) => {
  const validations = checkSchema(schema);

  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const error = errors
      .array()
      .map((item) => item.msg)
      .join(", ");

    return res.status(400).json({ error });
  };
};

module.exports = validatorMiddleware;
