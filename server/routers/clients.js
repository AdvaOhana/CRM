import { Router } from "express";
import { getClients, createClients, updateClient, deleteClient } from "../db/dbUtils.js";
import { validateClient } from "../middleware/validate.js";
export const clientRouter = Router();

clientRouter.get('/', async (req, res) => {

    return res.status(200).json({ clients: await getClients() })
})
clientRouter.post('/addClient', validateClient, async (req, res) => {
    try {
        await createClients(req.body)
        return res.status(200).json({ message: "created client successfully" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
clientRouter.patch('/updateClient/:id', async (req, res) => {
    try {
        const id = req.params
        await updateClient(id, req.body)
        return res.status(200).json({ message: "updated client successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
clientRouter.delete('/deleteClient/:id', async (req, res) => {
    try {
        const id = req.params
        await deleteClient(id)
        return res.status(200).json({ message: "deleted client successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})