import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }

        });

    } catch (error) {
        res.status(500).json({ message: ' server error', error: error.message });
    }
}

export const signIn = async (req,res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: 'Invalid email or Password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or Password'});
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Sign in successful',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }catch(error){
        res.status(500).json({message:'server error'});
    }
}