import { Router } from "express";
import { getClientsService, createClientsService, updateClientService, deleteClientService } from '../services/clientService.js'
export const clientRouter = Router();

clientRouter.get('/', async (req, res) => {

    return res.status(200).json({ clients: await getClientsService() })
})
clientRouter.post('/addClient', async (req, res) => {
    try {
        await createClientsService(req.body)
        return res.status(200).json({ message: "created client successfully" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
clientRouter.patch('/updateClient/:id', async (req, res) => {
    try {
        const id = req.params
        await updateClientService(id, req.body)
        return res.status(200).json({ message: "updated client successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
clientRouter.delete('/deleteClient/:id', async (req, res) => {
    try {
        const id = req.params
        await deleteClientService(id)
        return res.status(200).json({ message: "deleted client successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})