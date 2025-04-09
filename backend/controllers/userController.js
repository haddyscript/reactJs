const bcrypt = require("bcrypt");
const User = require('../models/User');

exports.getUserData = async (req, res) => {
    try{
        const user = req.user;
        if(!user){
            return res.status(404).json({ message: "User not found" , success : false });
        }

        res.status(200).json({
            message: "User data retrieved successfully",
            user   : {
                id: user.id,
                name: user.name,
                email: user.email
            },
            success: true
        });
    }catch(err) {
        console.error("Error getting user data: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.registerUser = async (req, res) => {
    try{
        const { name , email , password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where : {email} });
        if(existingUser){
            return res.status(200).json({ message: "Email already exists, please use a different email!" , success : false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(200).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            success: true
        });

    }catch(err) {
        console.error("Error registering user: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateUser = async (req, res) => {
    try{
        const { name , email } = req.body;
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found", success : false });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({message: "User updated successfully" , user : user, success: true});

    }catch(err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" , success : false });
        }

        await user.destroy();
        res.status(200).json({message : "User deleted successfully", success: true});

    }catch(err) {
        console.error("Error deleting user: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.logout = (req, res) => {
    res.status(200).send({ message: "Logged out successfully" });
};