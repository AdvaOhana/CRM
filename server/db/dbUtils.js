import { clientsCollection, usersCollection } from "./database.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.JWT_EXPIRY;

export async function getClients() {
    return await clientsCollection.find({}).toArray()

}
export async function createClients({ name, phone, email, description }) {
    try {
        await clientsCollection.insertOne({
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
        await clientsCollection.findOneAndUpdate(
            { _id: new ObjectId(id) }, { $set: { name, phone, email, description } }
        )
    } catch (error) {
        console.error(error)
        throw new Error("failed to update")
    }
}
export async function deleteClient({ id }) {
    try {
        await clientsCollection.deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        console.error(error)
        throw new Error("failed to delete")
    }
}
//users CRUD   
export async function getUsers() {
    return await usersCollection.find({}).toArray()
}
export async function createUser({ name, role, email, phone, password }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await usersCollection.insertOne({
            name,
            role,
            email,
            phone,
            password: hashedPassword
        })
    } catch (error) {
        console.error(error);
        throw new Error("failed to create user")
    }
}
export async function updateUser(id, { name, role, email, phone }) {
    try {
        await usersCollection.findOneAndUpdate(
            { _id: new ObjectId(id) }, { $set: { name, role, email, phone } }
        )
    } catch (error) {
        console.error(error)
        throw new Error("failed to update user")
    }
}
export async function deleteUser({ id }) {
    try {
        await usersCollection.deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        console.error(error)
        throw new Error("failed to delete user")
    }
}
export async function registerUser({ name, role, email, phone, password }) {
    try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10)

        await usersCollection.insertOne({
            name,
            role,
            email,
            phone,
            password: hashedPassword,
        });

    } catch (error) {
        console.error(error);
        throw new Error("failed to register user");
    }
}
export async function loginUser({ email, password }) {
    try {
        const user = await usersCollection.findOne({ email });
        if (!user) throw new Error("Invalid email or password");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

        const token = jwt.sign(
            { id: user._id, role: user.role || 'employee' },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        return token;
    } catch (error) {
        console.error(error);
        throw new Error("failed to login");
    }
}
