import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersDb } from '../database'; // Mock database

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = '1h';

export const register = async (userData) => {
    const { username, email, password } = userData;

    // Check if the user already exists
    const existingUser = usersDb.find(user => user.email === email);
    if (existingUser) {
        throw new Error('Email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user object
    const newUser = {
        id: usersDb.length + 1, // Example for auto-incremented ID
        username,
        email,
        password: hashedPassword,
    };

    // Save the new user to the "database"
    usersDb.push(newUser);

    return newUser;
};

export const login = async (credentials) => {
    const { email, password } = credentials;

    // Find the user by email
    const user = usersDb.find(user => user.email === email);
    if (!user) {
        throw new Error('User not found');
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });

    return { token, user };
};
