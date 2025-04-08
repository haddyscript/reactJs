const bcrypt = require("bcrypt");
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try{
        const { name , email , password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where : {email} });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
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
            }
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
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({message: "User updated successfully" , user : user});

    }catch(err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).json({message : "User deleted successfully"});

    }catch(err) {
        console.error("Error deleting user: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.logout = (req, res) => {
    res.status(200).send({ message: "Logged out successfully" });
};