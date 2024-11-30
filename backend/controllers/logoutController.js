import {User} from '../models/user.js';

export const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;

    try {
        // Check if the refreshToken exists in the database
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            // If no user is found, clear the JWT cookie and send No Content response
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204); // No content
        }

        // Remove the refreshToken from the user document
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        console.log(result); // Log the result for debugging

        // Clear the JWT cookie
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

        // Send No Content status after logout
        res.sendStatus(204); // No content
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'An error occurred during logout.' });
    }
};
