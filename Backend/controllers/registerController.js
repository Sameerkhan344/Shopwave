
import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //checking if any field missing
        if (!name || !email || !password) {
            return res.status(400).send({ success: false, message: "All fields required" })
        }

        //checking same user email exist or not ? ---
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(400).send({ success: "false", message: "Email already Exist" })
        }

        //passord encrypting---
        const hashedPassword = await encryptPassword(password)

        //creating new user ---
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        }); //userModal ki help se user create kiya hai ---
        return res.status(201).send({ success: true, message: "User registeration successful", newUser })
    } catch (err) {
        console.log(`registerController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in registerController", err })
    }
}

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        //checking if any field missing - Validation
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "All fields required" })
        }

        //checking user email is exist in database or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ success: false, message: "Email not registered" })
        }

        // matching password
        const isMatchPassword = await matchPassword(password, user.password);
        if (!isMatchPassword) {
            return res.status(401).send({ success: false, message: "Incorrect Email/Password" })
        }

        //generating token
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXP })


        //remove password field to user data  from backend to frontend
        user.password = undefined;

        //return success response--
        return res.cookie("token", token, { httpOnly: true, secure: true, sameSite:"None" })
            .status(200).send({ success: true, message: "Login Successfully", user, token })

    } catch (err) {
        console.log(`loginController Error - ${err}`)
        return res.status(400).send({ success: false, message: "error in loginController", err })
    }
}
const logoutController = async (req, res) => {
    return res.cookie("token", "", { httpOnly: true, secure: true, sameSite:"None", expires: new Date(0) }).status(200).send({ success: true, message: "Logout successfully" })
}

const allUsersController = async (req, res) => {
    try {
        //find all users in database by - .find({})
        const users = (await userModel.find({}).select("-password"));
        if (!users) {
            return res.status(404).send({ success: false, message: "No user found" });
        }
        return res.status(200).send({ success: true, total: users.length, users })
    }
    catch (error) {
        console.log(`allUsersController Error - ${error}`)
        return res.status(400).send({ success: false, message: "error in allUsersController", error })
    }
}

export { registerController, loginController, logoutController, allUsersController }
