import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uriDev = 'mongodb://localhost:27017/Forensics_db'; 
const uriProd = 'mongodb://mongodb:27017/Forensics_db'; 

if (process.env.NODE_ENV === 'production') {
    client = new MongoClient(uriProd);
    clientPromise = client.connect();
} else {
    client = new MongoClient(uriDev);
    clientPromise = client.connect();
}

export default clientPromise;
