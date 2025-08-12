import { collection } from "./database.js";
import { ObjectId } from "mongodb";
export async function getClients() {
    return await collection.find({}).toArray()

}
export async function createClients({ name, phone, email, description }) {
    if (!name || !phone || !email || !description) throw new Error("Data missing");
    try {
        await collection.insertOne({
            name,
            phone,
            email,
            description
        })
    } catch (error) {
        console.error(error)
        throw new Error("failed to create")

    }
}
export async function updateClient(id, { name, phone, email, description }) {
    try {
        await collection.findOneAndUpdate(
            { _id: new ObjectId(id) }, { $set: { name, phone, email, description } }
        )
    } catch (error) {
        console.error(error)
        throw new Error("failed to update")
    }
}
export async function deleteClient({ id }) {
    try {
        await collection.deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        console.error(error)
        throw new Error("failed to delete")
    }
}