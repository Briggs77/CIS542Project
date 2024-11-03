import clientPromise from './ConnectionHandler';
import { Db, Document, Filter, UpdateFilter, InsertOneResult, UpdateResult, DeleteResult } from 'mongodb';

class MongoDBService {
    private db: Db | null = null;

    async init() {
        if (!this.db) {
            const client = await clientPromise;
            this.db = client.db();
            console.log('Connected to MongoDB');
        }
    }

    async createDocument(collectionName: string, document: Document): Promise<InsertOneResult<Document>> {
        if (!this.db) throw new Error('Database not initialized');
        const collection = this.db.collection<Document>(collectionName);
        return await collection.insertOne(document);
    }

    async readDocument(collectionName: string, query: Filter<Document>): Promise<Document | null> {
        if (!this.db) throw new Error('Database not initialized');
        const collection = this.db.collection<Document>(collectionName);
        return await collection.findOne(query);
    }

    async updateDocument(
        collectionName: string,
        query: Filter<Document>,
        update: UpdateFilter<Document> | Partial<Document>
    ): Promise<UpdateResult> {
        if (!this.db) throw new Error('Database not initialized');
        const collection = this.db.collection<Document>(collectionName);
        return await collection.updateOne(query, { $set: update });
    }

    async deleteDocument(collectionName: string, query: Filter<Document>): Promise<DeleteResult> {
        if (!this.db) throw new Error('Database not initialized');
        const collection = this.db.collection<Document>(collectionName);
        return await collection.deleteOne(query);
    }
}

export default new MongoDBService();
