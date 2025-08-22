import { MongoClient } from 'mongodb'
import dotenv from "dotenv"

dotenv.config()

const client = new MongoClient(process.env.MONGO_URL);

export let clientsCollection;
export let usersCollection;

export async function startDataBaseConnection() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(process.env.DB_NAME);
        clientsCollection = db.collection('clients');
        usersCollection = db.collection('users')
        return true
    } catch (error) {
        console.log(error);
        await client.close()
        return false
    }
}
