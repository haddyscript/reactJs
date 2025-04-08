const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.protect = ( req, res, next ) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err) {
        console.error("Error in authMiddleware: ", err);
        res.status(500).json({ message: "Internal Server Error in auth middleware" });
    }
};

exports.adminOnly = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
};