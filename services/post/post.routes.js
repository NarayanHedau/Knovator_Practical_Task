var express = require("express");
var router = express.Router();
const passport = require("passport")
const controller = require("./post.controller");
const validator = require("./joivalidation")
var app = express();
app.use(passport.initialize());
require("../../helper/passport")

router.post(
    "/addPost",
    passport.authenticate('jwt', { session: false }),
    validator.addPostValidator,
    controller.addPost
)

router.get(
    "/getPost",
    passport.authenticate('jwt', { session: false }),
    validator.getPostValidator,
    controller.getPost
)

router.put(
    "/updatePost",
    passport.authenticate('jwt', { session: false }),
    validator.updatePostValidator,
    controller.updatePost
)

router.delete(
    "/deletePost/:id",
    passport.authenticate('jwt', { session: false }),
    validator.deletePostValidator,
    controller.deletePost
)

router.get(
    "/count-active-inactive",
    passport.authenticate('jwt', { session: false }),
    controller.countActiveJobs
)




module.exports = router;