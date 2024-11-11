import { NextApiRequest, NextApiResponse } from 'next';
import mongoDBService from '../../services/MongoDBService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET method allowed' });
    }

    try {
        await mongoDBService.init();

        const { collection } = req.query;
        
        if (!collection || typeof collection !== 'string') {
            return res.status(400).json({ message: 'Collection name is required and must be a string' });
        }

        const documentIds = await mongoDBService.getAllIDs(collection);

        res.status(200).json({ documentIds });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ message: 'An unexpected server error occurred' });
    }
}
