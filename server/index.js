import express from "express";
import cors from "cors";
import { clientRouter } from './routers/clients.js'
import { startDataBaseConnection } from "./db/database.js";

const PORT = 3001;
const app = express();
app.use(cors());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/api/clients", clientRouter);


const startApp = () => {
    app.listen(PORT, async () => {
        try {
            const connected = await startDataBaseConnection();
            if (!connected) throw new Error('Failed to connect to DB')
            console.log('Connected to DB.');
            console.log(`Listening on port ${PORT}`);
        } catch (error) {
            console.error(error);
        }
    });
}

startApp()