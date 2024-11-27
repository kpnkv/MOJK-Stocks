import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const handleNewUser = async (req, res) => {
    const { email, user, pwd } = req.body;

    if (!email || !user || !pwd) {
        return res.status(400).json({ message: 'Email, Username, and password are required.' });
    }

    try {
        // Check for duplicate usernames in the database
        const duplicate = await User.findOne({ username: user }).exec();
        if (duplicate) return res.sendStatus(409); // Conflict

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Create and store the new user
        const result = await User.create({
            email, // Fixed typo in the key name ("emmail" -> "email")
            username: user,
            password: hashedPwd,
        });

        console.log('New User Created:', result);

        res.status(201).json({ success: `New user ${user} created!` });
    } catch (err) {
        console.error('Error Creating User:', err);
        res.status(500).json({ message: err.message });
    }
};
