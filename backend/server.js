const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const User = require('./routes/userRoutes');
const { protect, adminOnly } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

//Middleware 
app.use(cors());
app.use(bodyParser.json());

//Routes 
app.use('/api/user', User);

app.get('/api/protected', protect , (req, res) => {
    res.status(200).json({ message: "Protected route accessed" });
});

// Admin-only route
app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.status(200).json({ message: "Admin route accessed", user: req.user });
});

//server listening
const PORT = process.env.PORT || 5000;
db.sync({ alter: true })
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));