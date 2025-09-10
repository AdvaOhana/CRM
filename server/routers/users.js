import { Router } from "express";
import { getUsers, updateUser, deleteUser, registerUser, loginUser } from "../db/dbUtils.js"
import { verifyToken, authRole } from "../middleware/auth.js";
import { validateUser, validateLogin } from "../middleware/validate.js";
export const userRouter = Router();

userRouter.get('/', async (req, res) => {
    return res.status(200).json({ users: await getUsers() })

})
userRouter.post('/login', verifyToken, validateLogin, async (req, res) => {
    try {

        const token = await loginUser(req.body);

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})
userRouter.post('/logout', async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false
    })
    return res.status(200).json({ message: "Logout successful" });

})
userRouter.post('/register', authRole, validateUser, async (req, res) => {
    try {
        await registerUser(req.body);
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})
userRouter.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params
        await updateUser(id, req.body)
        return res.status(200).json({ message: "updated user successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
userRouter.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params
        await deleteUser(id)
        return res.status(200).json({ message: "deleted user successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

