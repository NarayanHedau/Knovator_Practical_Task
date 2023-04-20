let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let fs = require("fs");
let config = require("./config.json");
const commonResponse = require("./helper/commonResponse");
const passport = require("passport")

const indexRouter = require("./routes/index");
const { mongodb } = require("./helper");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

indexRouter.initialize(app);
mongodb.mongo_connection();


app.use(passport.initialize());
require("./helper/passport")


function enableStaticFileServer(expressInstance, folderName, route) {
  app.use(route, express.static(path.join(__dirname, folderName)));
}

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return commonResponse.error(res, error.message, error.status);
});
enableStaticFileServer(app, config.uploadUrl, "/");



app.listen(config.server.port, () => {
  console.log("App listening on port : ", config.server.port);
});
