import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";


const generatePassword = async (password) => {
    const salt = await genSalt();
    return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
}


export const signUp = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { email, password } = req.body;

        if (email && password) {
            const user = await prisma.user.create({
                data: {
                    email, password: await generatePassword(password)
                }
            });
            return res.status(201).json(
                { user: { id: user.id, email: user.email },
                jwt: createToken(email, user.id)});
        }
        return res.status(400).send("Email and Password Required");
    } catch (err) {
        console.log(err);
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
};

export const login = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { email, password } = req.body;
        if (email && password) {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return res.status(404).send("User not found");
            }

            const auth = await compare(password, user.password);
            if (!auth) {
                return res.status(400).send("Invalid Password");
            }

            return res.status(200).json({
                user: { id: user?.id, email: user?.email },
                jwt: createToken(email, user.id),
            });
        } else {
            return res.status(400).send("Email and Password Required");
        }
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

export const getUserInfo = async (req, res, next) => {
    console.log(req.userId);
    try {
        if(req?.userId) {
            const prisma = new PrismaClient();
            const user = await prisma.user.findUnique({
                where: {
                    id: req.userId,
                }
            });
            delete user.password;
            return res.status(200).json({user})
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
