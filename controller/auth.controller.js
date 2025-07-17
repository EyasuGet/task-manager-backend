import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {

    const user = req.body
    if (!user.name || !user.email || !user.password){
        return res.status(400).json({
            message: "Please fill all the fields",
            success: false
        })
    }
    
    try {
        const email = user.email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered", success: false });
        }


        const hashedPassword = await bcrypt.hash(user.password, 15);
        const newUser = new User({
            ...user,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "user signed up sucessfully", data: newUser })
    }catch(error){
        console.error("Error in auth controller:", error.message)
        res.status(500).json({ success: false, message: "server error"})
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
  
    let user = await User.findOne({ email });
    if (!user) {
        user = await Nurse.findOne({ email });
    }
  
    if (!user) {
        return res.status(400).json({ message: "Invalid Email" });
    }
  
    const matchp = await bcrypt.compare(password, user.password);
  
    if (!matchp) {
        return res.status(400).json({ message: "Invalid Password" });
    }
  
    const token = jwt.sign(
        { _id: user._id, email: user.email, user: user.name},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", token});
};