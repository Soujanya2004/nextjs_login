import dbConnect from '../../../utils/dbConnect'; // You need to create this utility
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Set session logic here (e.g., using express-session)
            return res.status(200).json({ message: 'Login successful' });
        }
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
