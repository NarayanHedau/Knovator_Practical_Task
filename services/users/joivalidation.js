const Joi = require("joi")
const { commonResponse } = require("../../helper");

module.exports = {

  registration: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        Gender: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().min(10).max(12).required(),
        password: Joi.string().required()
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return commonResponse.CustomError(res, "VALIDATION_ERROR", 400, {}, error.message);
      }
      next();
    } catch (error) {
      console.log("error 21 =========================>", error);
      return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);

    }
  },

  login: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return commonResponse.CustomError(res, "VALIDATION_ERROR", 400, {}, error.message);
      }
      next();
    } catch (error) {
      console.log("error 39=========================>", error);
      return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);

    }
  },




}
