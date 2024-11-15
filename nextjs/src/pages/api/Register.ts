import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import mongoDBService from '../../services/MongoDBService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }

    try {
        await mongoDBService.init();

        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username, password, and email required' });
        }

        const existingUser = await mongoDBService.getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            passwordHash,
            email
        };

        await mongoDBService.createDocument('users', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ message: 'An unexpected server error occurred' });
    }
}
