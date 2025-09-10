import { getClients, createClients, updateClient, deleteClient } from "../db/dbUtils.js";

export async function getClientsService() {

    return await getClients()
}
export async function createClientsService({ name, phone, email, description }) {
    if (!name || !phone || !email) throw new Error("Data missing");

    return await createClients({ name, phone, email, description })
}
export async function updateClientService(id, { name, phone, email, description }) {

    return await updateClient(id, { name, phone, email, description })
}
export async function deleteClientService({ id }) {
    return await deleteClient({ id })
}