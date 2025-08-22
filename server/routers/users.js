import { Router } from "express";
import { getUserService, createUserService, updateUserService, deleteUserService, loginUserService, registerUserService } from "../services/userService.js";
import { verifyToken, authRole } from "../middleware/auth.js";
export const userRouter = Router();

userRouter.get('/allUsers', async (req, res) => {
    return res.status(200).json({ users: await getUserService() })

})
userRouter.post('/createUser', async (req, res) => {
    try {
        await createUserService(req.body)
        return res.status(200).json({ message: "created user successfully" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
userRouter.post('/login', verifyToken, async (req, res) => {
    try {

        const token = await loginUserService(req.body);

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
userRouter.post('/register', authRole, async (req, res) => {
    try {
        await registerUserService(req.body);
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})
userRouter.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params
        await updateUserService(id, req.body)
        return res.status(200).json({ message: "updated user successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
userRouter.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params
        await deleteUserService(id)
        return res.status(200).json({ message: "deleted user successfully" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})