const Joi = require("joi")
const { commonResponse } = require("../../helper");

module.exports = {

  addPostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        title: Joi.string(),
        body: Joi.string(),
        geoLocation: Joi.object().keys({
          latitude: Joi.string().required(),
          longitude: Joi.string().required(),
        }),
        status:Joi.string().required(),
        createdBy:Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return commonResponse.CustomError(res, "VALIDATION_ERROR", 400, {}, error.message);
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);

    }
  },

  getPostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
    });
      const { error, value } = schema.validate(req.query);
      if (error) {
        return commonResponse.CustomError(res, "VALIDATION_ERROR", 400, {}, error.message);
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);

    }
  },

  updatePostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        title: Joi.string(),
        body: Joi.string(),
        geoLocation: Joi.object().keys({
          latitude: Joi.string().required(),
          longitude: Joi.string().required(),
        }),
        status:Joi.string().required(),
        id: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return commonResponse.CustomError(res, "VALIDATION_ERROR", 400, {}, error.message);
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);

    }
  },

  deletePostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
    });
      const { error, value } = schema.validate(req.params);
      if (error) {
        return commonResponse.CustomError(res, "VALIDATION_ERROR", 400, {}, error.message);
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);

    }
  },


}
