import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const isAuthorized = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({ success: false, message: "Please login to access this resouces" })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await userModel.findById(decodedToken.id);
        next();

    } catch (error) {
        console.log(`isAuthorized middleware Error ${error}`);
        return res.status(400).send({ success: false, message: "error in isAuthorized middleware", error })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || user.role !== 1) {
            res.status(401).send({ success: false, message: "you are not authorized to access this resource" })
        }
        next();
    } catch (error) {
        console.log(`isAuthorized middleware Error ${error}`);
        return res.status(400).send({ success: false, message: "error in isAuthorized middleware", error })
    }
}

export { isAuthorized, isAdmin }