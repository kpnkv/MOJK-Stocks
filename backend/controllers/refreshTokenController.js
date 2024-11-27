import User from '../model/User.js';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401); // Unauthorized
    }

    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            return res.sendStatus(403); // Forbidden
        }

        // Verify the JWT
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) {
                    return res.sendStatus(403); // Forbidden
                }

                const roles = Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            username: decoded.username,
                            roles,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10s' } // Short-lived access token
                );

                res.json({ roles, accessToken });
            }
        );
    } catch (err) {
        console.error('Error handling refresh token:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
