const { commonResponse } = require("../../helper");
const PostModel = require("./post.model");
const validator = require("./joivalidation")

exports.get = async (id) => {
  return await PostModel.findOne({ _id: id });
};

exports.create = async (data) => {
  return await PostModel(data).save();
};

exports.update = async (id, reqBody) => {
  return await PostModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true })
};

exports.delete = async (id) => {
  return await PostModel.findOneAndDelete({ _id: id })
}

exports.find=async(reqQuery)=>{
  return await PostModel.find(reqQuery).count();
}