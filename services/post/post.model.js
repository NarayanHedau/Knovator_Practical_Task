const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    },
    geoLocation: {
      latitude: {
        type: String
      },
      longitude: {
        type: String
      },
    },
  
    status: {
      type: String,
      enum: ["Active", "Inactive"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
   
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;


