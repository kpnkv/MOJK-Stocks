import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized: Invalid username or password' });
        }

        // Compare the provided password with the stored hash
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            // Check if roles exist and filter them
            const roles = foundUser.roles ? Object.values(foundUser.roles).filter(Boolean) : [];

            // Create access and refresh JWTs
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.username,
                        roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } // 15-minute access token
            );

            const refreshToken = jwt.sign(
                { username: foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' } // 1-day refresh token
            );

            // Save the refresh token with the current user in the database
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result); // For debugging
            console.log(roles);

            // Create a secure HttpOnly cookie for the refresh token
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            // Send the roles and access token back to the client
            res.json({ roles, accessToken });

        } else {
            res.status(401).json({ message: 'Unauthorized: Invalid username or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};
