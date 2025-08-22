import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()
import { clientRouter } from './routers/clients.js'
import { userRouter } from './routers/users.js'
import { startDataBaseConnection } from "./db/database.js";


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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use("/api/clients", clientRouter);
app.use("/api/users", userRouter)


const startApp = () => {
    app.listen(process.env.PORT, async () => {
        try {
            const connected = await startDataBaseConnection();
            if (!connected) throw new Error('Failed to connect to DB')
            console.log('Connected to DB.');
            console.log(`Listening on port ${process.env.PORT}`);
        } catch (error) {
            console.error(error);
        }
    });
}

startApp()