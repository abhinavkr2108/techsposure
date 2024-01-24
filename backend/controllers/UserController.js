const { HttpError } = require("../models/ErrorModel");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
/**
 * Regiter a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * POST: api/users/register
 * Unprotected
 */
async function registerUser(req,res,next){
    try {
        const { name, email, password, confirmPassword } = req.body;

        if(!name ||!email ||!password ||!confirmPassword){
            return next(new HttpError("Please provide all the required fields", 422));
        }
        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({email: newEmail});

        if(emailExists){
            return next(new HttpError("Email already exists", 422));
        }
        if(password.trim().length <6){
            return next(new HttpError("Password must be at least 6 characters", 422));
        }
        if(password!== confirmPassword){
            return next(new HttpError("Passwords do not match", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name:name,
            email: newEmail,
            password: hashedPassword,
        });
        if(!newUser){
            return next(new HttpError("Could not register user. Try after sometime", 404));
        }
        // const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
        const {_id: id} = newUser;
        // const userName = newUser.name;
        // const token = jwt.sign({id, userName}, process.env.JWT_SECRET);
        res.status(200).json({message: "User Registered", id, newUser});
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
    // 
  
}

/**
 * Login an existing user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * POST: api/users/login
 * Unprotected
 */
async function loginUser(req,res,next){

    try {
        const { email, password } = req.body;
        if(!email ||!password){
            return next(new HttpError("Please provide all the required fields", 422));
        }
        const newEmail = email.toLowerCase();
        const user = await User.findOne({email: newEmail});

        if(!user){
            return next(new HttpError("Invalid Credentials: Email does not exists", 422));
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return next(new HttpError("Invalid Credentials: Password does not match", 422));
        }
        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET);

        res.status(200).json({message: "User Logged In", token,id,name});
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
    
}

/**
 * View User Profile
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * POST: api/users/find/:id
 * Protected
 */
async function viewUserProfile(req,res,next){
    try {
        const {id} = req.params;
        if(!id){
            return next(new HttpError("User not found", 404));
        }
        const user = await User.findById(id).select("-password");
        if(!user){
            return next(new HttpError("User not found", 404));
        }

        res.status(200).json({ user });
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
    
}

/**
 * Change User Avatar(Profile Pic)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * POST: api/users/change-avatar
 * Protected
 */
async function changeUserAvatar(req,res,next){
    try {
        const avatar = req.files.avatar;
        if(!avatar){
            return next(new HttpError("Please provide an image", 422));
        }
        const user = await User.findById(req.user.id);
        const testUser = await User.findById(req.user._id);
        console.log(testUser);
        // Check if avatar already exists and delete it
        if(user.avatar){
            fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
                if (err){
                    next(new HttpError(err.message, 422));
                }
            })
        }

        if(avatar.size > 1000000){
            return next(new HttpError("File size too large", 422));
        }
        // Change avatar name
        let avatarName = avatar.name;
        let splittedName = avatarName.split(".");
        let extension = splittedName[splittedName.length -1];
        let newFileName = splittedName[0] + "-" + Date.now() + "." + extension;
        let updatedUser;
        avatar.mv(path.join(__dirname, "..", "uploads", newFileName), async (err) => {
            if(err){
                return next(new HttpError(err.message, 422));
            }
            // Update user avatar
            updatedUser = await User.findByIdAndUpdate(req.user.id, {avatar: newFileName}, {new: true});
            if(!updatedUser){
                return next(new HttpError("Could not change the profile image. Try after sometime", 404));
            }
            res.status(200).json({message: "Avatar Changed", updatedUser});
        })
       
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}

/**
 * Change User Information
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * POST: api/users/edit-user
 * Protected
 */
async function editUserDetails(req,res,next){
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        if(!name ||!email ||!currentPassword ||!newPassword ||!confirmNewPassword){
            return next(new HttpError("Please provide all the required fields", 422));
        }
        //get user from database
        const user = await User.findById(req.user.id);
        // console.log(user);
        if(!user){
            return next(new HttpError("User not found", 404));
        }

        const emailUserExists = await User.findOne({email: email});

        //Updated user email should not be same as someone's else email
        if(emailUserExists && emailUserExists._id.toString()!== user._id.toString()){
            return next(new HttpError("Email already exists", 422));
        }

        //Compare currentPassword to password in database. If they match, then update the password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if(!passwordMatch){
            return next(new HttpError("Invalid Credentials: Password does not match", 422));
        }
        
        //Compare New Passwords
        if(newPassword!== confirmNewPassword){
            return next(new HttpError("New Password and Confirm password do not match", 422));
        }
        //Encrypt new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //Update user information
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {name, email, password: newHashedPassword}, {new: true});
        if(!updatedUser){
            return next(new HttpError("Could not update user information. Try after sometime", 404));
        }
        res.status(200).json({message: "User information updated", updatedUser});
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
}

/**
 * View All Authors (Users of our App)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * GET: api/users/authors
 * Protected
 */
async function viewAllAuthors(req,res,next){
    try {
        const authors = await User.find().select("-password");
        if(!authors){
            return next(new HttpError("No users found", 404));
        }

        res.status(200).json({authors});
        
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }

}

module.exports = {registerUser, loginUser, viewUserProfile, changeUserAvatar, editUserDetails, viewAllAuthors};