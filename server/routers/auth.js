import { Router } from "express";
import { authCookie } from "../middleware/auth.js";

export const authRouter = Router();


authRouter.get('/', authCookie, async (req, res) => {
    return res.status(200).json({ user: req.user });

});