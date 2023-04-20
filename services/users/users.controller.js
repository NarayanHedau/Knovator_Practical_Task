const UsersService = require("./users.services");
const { commonResponse } = require("../../helper");
const validator = require("./joivalidation")
const path = require('path');
const bcrypt = require("bcrypt");
const { response } = require("express");
const config = require("../../config.json")
let jwt = require("jsonwebtoken");




module.exports = {

    /*
    *  Register
    */
    register: async (req, res, next) => {
        try {
            let query = {
                $or: [{ email: req.body.email },
                { mobile: req.body.mobile },]
            }
            const userData = await UsersService.findOne(query)
            if (userData) {
                return commonResponse.customResponse(res, "USER_ALREADY_EXIST", 403)
            }else{
                let data = req.body;
                bcrypt.genSalt(config.saltRounds, async function (err, salt) {
                    bcrypt.hash(data.password, salt, async function (err, hash) {
                        data["password"] = hash;
                        let user = await UsersService.create(data)
                        if (user) {
                            return commonResponse.success(res, "USER_REGISTER_SUCCESSFULLY", 200, user)
                        } else {
                            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
                        }
                    })
                });
            }
        } catch (error) {
            console.log("error ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    },

    /*
    *  Login
    */
    login: async (req, res, next) => {
       try {
        const { email, mobile, password } = req.body;
        let query = {
            $or: [{ email: email }, { mobile: mobile }],
          }
        let findUser = await UsersService.findOne(query);
        if (!findUser) {
            return commonResponse.customResponse(res, "EMAIL_OR_MOBILE_NUMBER_NOT_FOUND", 404)
          } else {
            findUser = JSON.parse(JSON.stringify(findUser));
            let matchPasword = await bcrypt.compare(password, findUser.password);
            if (matchPasword) {
              let token = await jwt.sign(findUser, config.secrete, {
                expiresIn: "24h",
              });
              findUser["token"] = `Bearer ${token}`;
              return commonResponse.success(res, "USER_LOGIN_SUCCESSFULLY", 200, findUser)
            } else {
              return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500,);
            }
          }
       } catch (error) {
        console.log("error ", error);
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
       }
    },

    /*
    *  get profile
    */
    getProfile: async(req,res)=>{
        try {
            const findUser = await UsersService.findOne({_id:req.user})
            return commonResponse.success(res, "USER_FETCHED", 200, findUser)
        } catch (error) {
            console.log("error ", error);
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }

};
