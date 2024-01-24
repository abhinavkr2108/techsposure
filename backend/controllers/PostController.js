const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const path = require("path");
const fs = require("fs");
const { HttpError } = require("../models/ErrorModel");

/**
 * Function to create post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * POST: api/create-post
 * Protected
 */

async function createPost(req,res,next){
    try {
        let {title, content, category} = req.body;
        if(!title || !content || !category){
            return next(new HttpError("Please provide all the required fields", 422));
        }
        const currentUser = await User.findById(req.user.id);
        
        // Default image file name
        let imageFileName = 'default.jpg';

        // Check if image is provided in the request
        if(req.files && req.files.image){
            const {image} = req.files;

            if(image.size > 2000000){
                return next(new HttpError("Image size should be less than 2MB", 422));
            }

            let fileName = image.name;
            let splitName = fileName.split(".");
            let extName = splitName[splitName.length-1];
            imageFileName = splitName[0] + "-" + Date.now() + "." + extName;
            
            image.mv(path.join(__dirname, "..", "/uploads", imageFileName), async (err) => {
                if(err){
                    return next(new HttpError(err.message, 422));
                }
            });
        }

        const newPost = await Post.create({
            title: title,
            content: content,
            category: category,
            image: imageFileName,
            user: req.user.id,
        })
        if(!newPost){
            return next(new HttpError("Could not create post. Try after sometime", 404));
        }

        const userPostCount = currentUser.postsNumber+1;
        await User.findByIdAndUpdate(req.user.id, {postsNumber: userPostCount}, {new: true});

        return res.status(200).json({message: "Post Created", newPost});
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}


/**
 * Function to get all posts
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * GET: api/posts/all-posts
 * Unprotected
 */
async function getPosts(req,res,next){
    try {
        const posts = await Post.find().sort({updatedAt: -1});
        if(!posts){
            return next(new HttpError("No posts found", 404));
        }
        return res.status(200).json({message: "Posts Retrieved", posts});
        
    } catch (error) {
        next(new HttpError(error.message, 422));
    }
}

/**
 * Function to get a particular post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * GET: api/posts/:id
 * Unprotected
 */
async function getSinglePost(req,res,next){
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found", 404));
        }
        return res.status(200).json({message: "Post Retrieved", post});
        
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}


/**
 * Function to get a particular category post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * GET: api/posts/categories/:category
 * Unprotected
 */
async function getCategoryPosts(req,res,next){
    try {
        const {category} = req.params;
        const categoryPosts = await Post.find({category: category}).sort({updatedAt: -1});
        if(!categoryPosts){
            return next(new HttpError("No posts found for this category", 404));
        }
        return res.status(200).json({message: "Posts Retrieved", categoryPosts});
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}


/**
 * Function to get all posts by an author
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * GET: api/posts/users/:id
 * Unprotected
 */
async function getAuthorPosts(req,res,next){
    try {
        const {id} = req.params;
        const authorPosts = await Post.find({user: id}).sort({updatedAt: -1});
        if(!authorPosts){
            return next(new HttpError("No posts found for this author", 404));
        }
        return res.status(200).json({message: "Posts Retrieved", authorPosts});
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}


/**
 * Function to edit a particular post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * PATCH: api/posts/:id
 * Protected
 */
async function editPost(req,res,next){
    try {
        let updatedPost;
        const postId = req.params.id;
        const {title, content, category} = req.body;
        if(!title || !content || !category){
            return next(new HttpError("Please provide all the required fields", 422));
        }
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found", 404));
        }

        if(req.user.id!== post.user.toString()){
            return next(new HttpError("You are not authorized to edit this post", 401));
        }
        
        if (!req.files) {
            updatedPost = await Post.findByIdAndUpdate(postId, {title: title, content: content, category: category}, {new: true});
        }else{
            if(post.image!== 'default.jpg'){
                fs.unlinkSync(path.join(__dirname, "..", "/uploads", post.image), async(err) => {
                    if(err){
                        return next(new HttpError(err.message, 422));
                    }
                });
            }
            const {image} = req.files;
            if(image.size > 2000000){
                return next(new HttpError("Image size should be less than 2MB", 422));
            }
            let fileName = image.name;
            let splitName = fileName.split(".");
            let extName = splitName[splitName.length-1];
            let imageFileName = splitName[0] + "-" + Date.now() + "." + extName;
            image.mv(path.join(__dirname, "..", "/uploads", imageFileName), async (err) => {
                if(err){
                    return next(new HttpError(err.message, 422));
                }
            });
            updatedPost = await Post.findByIdAndUpdate(postId, {title: title, content: content, category: category, image: imageFileName}, {new: true});
        }
        if(post.user.toString()!== req.user.id){
            return next(new HttpError("You are not authorized to edit this post", 401));
        }
        return res.status(200).json({message: "Post updated", updatedPost});
        
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}

/**
 * Function to delete a particular post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * DELETE: api/posts/:id
 * Protected
 */
async function deletePost(req,res,next){
    try {
        const postId = req.params.id;  
        if(!postId){
            return next(new HttpError("Unable to find post", 422));
        }

        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found", 404));
        }

        const postImage = post.image;

        if(req.user.id===post.user.toString()){
              // Delete the post image from the server if it is not the default image
            if(postImage!== 'default.jpg'){
                fs.unlinkSync(path.join(__dirname, "..", "/uploads", postImage), async(err) => {
                    if(err){
                        return next(new HttpError(err.message, 422));
                    }
                });
            }
            await Post.findByIdAndDelete(postId);
            // Decrease the postsNumber for the user
            const user = await User.findById(post.user);
            const userPostsNumber = user?.postsNumber - 1;
            await User.findByIdAndUpdate(post.user, {postsNumber: userPostsNumber});
            return res.status(200).json({message: "Post deleted"});
        }
        else{
            return next(new HttpError("You are not authorized to delete this post", 401));
        }
        

    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}

module.exports = {createPost,getPosts,getSinglePost,getCategoryPosts,getAuthorPosts,editPost,deletePost};
