var express = require("express");
var router = express.Router();
const passport = require("passport")
const controller = require("./users.controller");
const validator = require("./joivalidation")
var app = express();
app.use(passport.initialize());
require("../../helper/passport")
router.post(
    "/register",
    validator.registration,
    controller.register
);

router.post(
    "/login",
    validator.login,
    controller.login
);

router.get(
    "/get", 
    passport.authenticate('jwt', { session: false }), 
    controller.getProfile)


module.exports = router;