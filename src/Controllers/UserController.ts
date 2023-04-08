import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async createUser(req: Request, res: Response) {
        try {
            const { Nome, Email, Senha } = req.body;

            let user = await prisma.usuarios.findFirst({ where: { Email: Email } });

            if (user) return res.json({ error: "Usuario já existe" }).sendStatus(400);

            user = await prisma.usuarios.create({
                data: {
                    Nome: Nome,
                    Email: Email,
                    Senha: Senha,
                },
            });

            return res.json(user);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na criação do usuário" }).sendStatus(500);
        }
    },

    async findUser(req: Request, res: Response) {
        try {
            const { Email, Senha } = req.body;

            const user = await prisma.usuarios.findFirst({ where: { Email: Email, Senha: Senha } });

            if (!user) return res.json({ error: "Não foi possível encontrar o usuário" }).sendStatus(400);

            return res.sendStatus(200);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na obtenção desse usuário" }).sendStatus(500);
        }
    },
};
