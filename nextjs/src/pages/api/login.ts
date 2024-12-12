import { NextApiRequest, NextApiResponse } from 'next';
import AuthService from '../../services/AuthService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) 
{
    if (req.method !== 'POST') 
    {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }

    try 
    {
        const { username, password, metrics } = req.body;

        const result = await AuthService.login(username, password, metrics);

        res.status(result.status).json(result);
    } 
    catch (error) 
    {
        console.error('Login error, probably with mongodb:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
