import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async createUser(req: Request, res: Response) {
        try {
            const { Nome, Email, Senha } = req.body;

            let user = await prisma.usuarios.findFirst({ where: { Email: Email } });

            if (user) return res.json({ error: "Usuario já existe" });

            user = await prisma.usuarios.create({
                data: {
                    Nome: Nome,
                    Email: Email,
                    Senha: Senha,
                },
            });

            return res.json(user);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na criação do usuário" });
        }
    },
};
