import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

// A `main` function so that we can use async/await
async function main() {
    const user1Email = `alice${Date.now()}@prisma.io`;
    const user2Email = `bob${Date.now()}@prisma.io`;

    // Seed the database with users and posts
    const user1 = await prisma.user.create({
        data: {
            email: user1Email,
            name: "Alice",
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: user2Email,
            name: "Bob",
        },
    });
    console.log(`Created users: ${user1.name} and ${user2.name} `);

    // Retrieve all posts by user with email alice@prisma.io
    const users = await prisma.user.findMany();
    console.log(`Retrieved all users: ${JSON.stringify(users)}`);
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
