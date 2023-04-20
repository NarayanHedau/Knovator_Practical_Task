const { commonResponse } = require("../../helper");
const UsersModel = require("./users.model");
const validator = require("./joivalidation")

exports.findOne= async (reqQuery) => {
  return  await UsersModel.findOne(reqQuery); 
};

exports.create= async (data) => {
  return  await UsersModel(data).save(); 
};
