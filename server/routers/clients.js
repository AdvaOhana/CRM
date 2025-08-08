import { Router } from "express";
import { getClients, createClients, updateClient, deleteClient } from "../db/dbUtils.js"

export const clientRouter = Router();

clientRouter.get('/', async (req, res) => {
    return res.status(200).json({ clients: await getClients() })
})
clientRouter.post('/addClient', async (req, res) => {
    try {
        const payload = req.body

        await createClients(payload)
        return res.status(200).json({ message: "created client successfully" })
    } catch (error) {
        return res.status(400)
    }
})
clientRouter.patch('/updateClient/:id', async (req, res) => {
    try {
        const id = req.params
        await updateClient(id, req.body)
        return res.status(200).json({ message: "updated client successfully" })

    } catch (error) {
        return res.status(400)
    }
})
clientRouter.delete('/deleteClient/:id', async (req, res) => {
    try {
        const id = req.params
        await deleteClient(id)
        return res.status(200).json({ message: "deleted client successfully" })

    } catch (error) {
        return res.status(400)
    }
})