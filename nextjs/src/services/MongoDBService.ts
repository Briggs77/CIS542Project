import clientPromise from './ConnectionHandler';
import {
    Db,
    Document,
    Filter,
    InsertOneResult,
    UpdateResult,
    DeleteResult,
    ObjectId,
    UpdateFilter
} from 'mongodb';

class MongoDBService {
    private db: Db | null = null;

    async init() {
        if (!this.db) {
            const client = await clientPromise;
            this.db = client.db();
            console.log('Connected to MongoDB');
        }
    }



    async getDocumentId(collectionName: string, query: Filter<Document>): Promise<ObjectId | null> {
        const collection = this.db!.collection<Document>(collectionName);  
        const document = await collection.findOne(query, { projection: { _id: 1 } });
        return document ? document._id : null;
    }

    async getAllIDs(collectionName: string): Promise<ObjectId[]> {
        const collection = this.db!.collection<Document>(collectionName);  
        const documents = await collection.find({}, { projection: { _id: 1 } }).toArray();
        return documents.map(doc => doc._id);
    }

    async createDocument(collectionName: string, document: Document): Promise<InsertOneResult<Document>> {
        const collection = this.db!.collection<Document>(collectionName);
    
        return await collection.insertOne({ ...document });
    }

    async updateDocument(collectionName: string, id: string, updateData: Partial<Document>): Promise<UpdateResult> {
        const collection = this.db!.collection<Document>(collectionName); 
    
        const objectId = new ObjectId(id);
    
        return await collection.updateOne({ _id: objectId }, { $set: updateData });
    }

    async readDocument(collectionName: string, query: Filter<Document>): Promise<Document | null> {
        const collection = this.db!.collection<Document>(collectionName); 
        return await collection.findOne(query);
    }

    async deleteDocument(collectionName: string, query: Filter<Document>): Promise<DeleteResult> {
        const collection = this.db!.collection<Document>(collectionName);  
        return await collection.deleteOne(query);
    }

    async getUserByUsername(username: string): Promise<Document | null> {
        const collection = this.db!.collection<Document>('users'); 
        const user = await collection.findOne({ username: username });
        return user;
    }
}


export default new MongoDBService();
