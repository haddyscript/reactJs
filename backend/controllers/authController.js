const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if(!email || !password){
            return res.status(200).json({ message: "Email and password are required" });
        }
        if(!user){
            return res.status(200).json({ message: "Invalid email or password", success : false });
        }

        const isMatchPassword =  await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(200).json({ message: "Invalid password", success: false });
        }
        
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role : user.role
            },
            token : token,
            success: true
        });

    } catch (error) {
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};