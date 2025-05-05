const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try {
        const {name , email , password , role } = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({ name , email ,password:hashedPassword , role });

        res.status(201).json({ message : "User registered" , user})
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
}

const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }        

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        if(!token){
            return res.status(401).json({ message: "Token Problem" });
        }
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error : " , error);
        res.status(500).json({ message: "Error logging in" });
    }
}

module.exports = { register, login };  
