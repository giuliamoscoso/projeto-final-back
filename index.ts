import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const produtos = await prisma.produtos.findMany();
    const usuarios = await prisma.usuarios.findMany();
    console.log(produtos);
    console.log(usuarios);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
