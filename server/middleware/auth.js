import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function verifyToken(req, res, next) {
    const { jwt: token } = req.cookies

    if (!token) return next()

    try {
        const { id, role } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id || !role) next();
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        return next()
    }
}
export function authRole(req, res, next) {
    const { jwt: token } = req.cookies
    if (!token) throw new Error('Please login first')

    try {
        const { role } = jwt.verify(token, process.env.JWT_SECRET)
        if (role !== 'admin') throw new Error("You dont have the premissions");
        return next()

    } catch (error) {
        return res.status(404).json({ message: error?.message || message });

    }
}

export function authCookie(req, res, next) {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: "Unauthenticated user" });
    try {

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next()
    } catch (error) {
        return res.status(403).json({ message: "expired token" });
    }
}