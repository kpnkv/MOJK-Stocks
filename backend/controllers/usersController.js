import User from '../model/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(204).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'User ID required' });
    }

    try {
        const user = await User.findOne({ _id: id }).exec();
        if (!user) {
            return res.status(204).json({ message: `User ID ${id} not found` });
        }

        const result = await user.deleteOne();
        res.json({ message: `User ID ${id} deleted`, result });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'User ID required' });
    }

    try {
        const user = await User.findOne({ _id: id }).exec();
        if (!user) {
            return res.status(204).json({ message: `User ID ${id} not found` });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
};
