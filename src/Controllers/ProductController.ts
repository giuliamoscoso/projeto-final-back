import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async findAllUProducts(req: Request, res: Response) {
        try {
            const allProducts = await prisma.produtos.findMany();

            if (!allProducts) return res.json({ error: "Não foi possível encontrar os produtos" }).sendStatus(400);

            return res.json(allProducts).sendStatus(200);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na obtenção dos produtos" }).sendStatus(500);
        }
    },

    async createProduct(req: Request, res: Response) {
        try {
            const { Nome, CodBarras, Quantidade, Preco } = req.body;

            let product = await prisma.produtos.findFirst({ where: { CodBarras: CodBarras } });

            if (product) return res.json({ error: "Produto já existe" }).sendStatus(400);

            product = await prisma.produtos.create({
                data: {
                    Nome: Nome,
                    CodBarras: CodBarras,
                    Quantidade: Quantidade,
                    Preco: Preco,
                },
            });

            return res.json(product).sendStatus(200);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na criação do produto" }).sendStatus(500);
        }
    },

    async deleteProduct(req: Request, res: Response) {
        try {
            const { Id } = req.params;

            const product = await prisma.produtos.findFirst({ where: { Id: Number(Id) } });

            if (!product) return res.json({ error: "Não foi possível encontrar o produto" }).sendStatus(400);

            await prisma.produtos.delete({ where: { Id: Number(Id) } });

            return res.json({ message: "Usuário deletado com sucesso" }).sendStatus(200);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na obtenção desse usuário" }).sendStatus(500);
        }
    },
};
