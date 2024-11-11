import { NextApiRequest, NextApiResponse } from 'next';
import mongoDBService from '../../services/MongoDBService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }

    try {
        await mongoDBService.init();

        if (typeof req.body !== 'object' || req.body === null) {
            throw new Error('Request body NULL');
        }

        const { collection, id, ...data } = req.body;

        if (!collection) {
            return res.status(400).json({ message: 'Collection name is empty or not provided' });
        }

        if (!id) {
            return res.status(400).json({ message: 'Document ID is empty or not provided' });
        }

        console.log('Updating document with ID:', id, 'in collection:', collection, 'with data:', data);

        await mongoDBService.updateDocument(collection, id, data);

        res.status(200).json({ message: 'Document updated successfully' });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ message: 'An unexpected server error occurred' });
    }
}