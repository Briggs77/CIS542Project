import { NextApiRequest, NextApiResponse } from 'next';
import mongoDBService from '../../services/MongoDBService';
import SessionManager from '../../services/SessionManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) 
{
    if (req.method !== 'POST') 
    {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }

    try 
    {
        await mongoDBService.init();

        const { token, metricsHash, currentTime, currentTimeHash, collection, fields, ...data } = req.body;

        if (!token) 
        {
            return res.status(201).json({ message: 'Token is required' });
        }

        const isValidSession = await SessionManager.checkSession(token, metricsHash, currentTime, currentTimeHash);

        if (!isValidSession) 
        {
            return res.status(203).json({ message: 'expired session' }); 
        }

        if (!collection) 
        {
            return res.status(200).json({ message: 'Collection not provided' });
        }

        console.log('AddDocument: Received Data:', { ...fields, ...data });

        await mongoDBService.createDocument(collection, { ...fields, ...data });

        res.status(200).json({ message: 'Data processed successfully!' });
    } 
    catch (error) 
    {
        console.error('Add Document error, probably with mongodb:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
