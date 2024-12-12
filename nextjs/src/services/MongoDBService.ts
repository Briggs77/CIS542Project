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

    async getAllIDs(collectionName: string): Promise<ObjectId[]> {
        const collection = this.db!.collection<Document>(collectionName);  
        const documents = await collection.find({}, { projection: { _id: 1 } }).toArray();
        return documents.map(doc => doc._id);
    }

    async createDocument(collectionName: string, document: Document): Promise<InsertOneResult<Document>> {
        const collection = this.db!.collection<Document>(collectionName);
    
        if (document._id && typeof document._id === 'string') {
            document._id = new ObjectId(document._id);
        }
    
        return await collection.insertOne({ ...document });
    }
    

    async updateDocument(collectionName: string, id: string, updateData: UpdateFilter<Document>): Promise<UpdateResult> {
        const collection = this.db!.collection<Document>(collectionName);
        const objectId = new ObjectId(id);    
        return await collection.updateOne({ _id: objectId }, updateData);
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
