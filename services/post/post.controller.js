const PostService = require("./post.services");
const { commonResponse } = require("../../helper");
const validator = require("./joivalidation")
const path = require('path');
const bcrypt = require("bcrypt");
const { response } = require("express");
const config = require("../../config.json")
let jwt = require("jsonwebtoken");

module.exports = {
    /*
    *  AddPost
    */
    addPost: async (req, res) => {
        try {
            const user = req.user;
            console.log(user);
            const post = await PostService.create(req.body)
            return commonResponse.success(res, "ADD_POST_SUCCESSFULLY", 200, post)
        } catch (error) {
            console.log("error ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    },

    /*
    *  GetPost
    */
    getPost: async (req, res) => {
        try {
            const user = req.user;
            const { id } = req.query;
            const getPost = await PostService.get(id)
            if (getPost) {
                return commonResponse.success(res, "GET_POST_SUCCESSFULLY", 200, getPost)
            } else {
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    },

    /*
    *  Update Post
    */
    updatePost: async (req, res) => {
        try {
            const user = req.user;
            const { id, title, body, geoLocation, status  } = req.body;
            const obj={
                title:title,
                body:body,
                geoLocation:geoLocation,
                status:status
            }
            const updatePost = await PostService.update(id, obj)
            if (updatePost) {
                const getPost = await PostService.get(updatePost._id)
                return commonResponse.success(res, "POST_UPDATED_SUCCESSFULLY", 200, getPost)
            } else {
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    },

    /*
    *  Delete Post
    */
    deletePost: async (req, res) => {
        try {
            const user = req.user;
            const id = req.params.id
            const deletePost = await PostService.delete(id)
            if (deletePost) {
                return commonResponse.success(res, "POST_DELETED_SUCCESSFULLY", 200)
            } else {
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    },

    /*
    *  Count Active Inactive count
    */
    countActiveJobs: async (req, res) => {
        try {
            const user = req.user;
            const activePost = await PostService.find({ status: "Active" })
            const inactivePost = await PostService.find({ status: "Inactive" })
            const response={
                activeCount:activePost,
                inactiveCount:inactivePost
            }
            return commonResponse.success(res, "ACTIVE_AND_INACTIVE_COUNT", 200, response)
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }

};





