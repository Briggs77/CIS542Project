import { NextApiRequest, NextApiResponse } from 'next';
import HashManager from '../../shared_components/HashManager';
import mongoDBService from '../../services/MongoDBService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) 
{
    if (req.method !== 'POST') 
    {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }

    try 
    {
        await mongoDBService.init();

        const { username, password, email } = req.body;

        if (!username || !password || !email) 
        {
            return res.status(400).json({ message: 'Username, password, and email required'});
        }

        const existingUser = await mongoDBService.getUserByUsername(username);
        if (existingUser) 
        {
            return res.status(202).json({ message: 'Username already exists' });
        }

        const passwordHash = HashManager.generateDefaultHash(password);

        const newUser = {username, passwordHash, email};

        await mongoDBService.createDocument('users', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) 
    {
        console.error('Register error, probably with mongodb:', error);
        res.status(500).json({ message: 'Server error' });
    }
}