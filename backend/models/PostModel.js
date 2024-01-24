const {Schema, model} = require("mongoose");

const postSchema = new Schema({
    title:{type: String, required: true},
    content:{type: String, required: true},
    category:{type: String, required: true},
    user:{type: Schema.Types.ObjectId, ref: "User", required: true},
    image:{type: String},
}, {timestamps: true});

const Post = model("Post", postSchema);
module.exports = Post;