import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';
const dbName = 'crm';
const client = new MongoClient(url);
export let collection;

export async function startDataBaseConnection() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        collection = db.collection('clients');
        return true
    } catch (error) {
        console.log(error);
        await client.close()
        return false
    }
}
