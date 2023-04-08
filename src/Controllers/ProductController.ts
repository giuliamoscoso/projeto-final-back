import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async findAllUProducts(req: Request, res: Response) {
        try {
            const allProducts = await prisma.produtos.findMany();

            if (!allProducts) return res.json({ error: "Não foi possível encontrar os produtos" });

            return res.json(allProducts);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na obtenção dos produtos" });
        }
    },

    async createProduct(req: Request, res: Response) {
        try {
            const { Nome, CodBarras, Quantidade, Preco } = req.body;

            let product = await prisma.produtos.findFirst({ where: { CodBarras: CodBarras } });

            if (product) return res.json({ error: "Produto já existe" });

            product = await prisma.produtos.create({
                data: {
                    Nome: Nome,
                    CodBarras: CodBarras,
                    Quantidade: Quantidade,
                    Preco: Preco,
                },
            });

            return res.json(product);
        } catch (error) {
            return res.json({ error: "Ocorreu um erro na criação do produto" });
        }
    },

    // async deleteProduct(req: Request, res: Response) {
    //     try {
    //         console.log(req.params);

    //         const { Id } = req.params;

    //         console.log(Id);

    //         const product = await prisma.produtos.findFirst({ where: { Id: Number(Id) } });

    //         if (product === null) return res.json({ error: "Não foi possível encontrar o produto" });

    //         await prisma.produtos.delete({ where: { Id: Number(Id) } });

    //         return res.json({ message: "Usuário deletado com sucesso" });
    //     } catch (error) {
    //         return res.json({ error: "Ocorreu um erro na obtenção desse usuário" });
    //     }
    // },
};
