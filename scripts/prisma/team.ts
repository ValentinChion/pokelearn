import { createTeam } from "../../src/app/actions/team";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import * as beautify from "beautify-json";

const prisma = new PrismaClient().$extends(withAccelerate());

// A `main` function so that we can use async/await
async function main() {
    createTeam({
        name: "Blue's team",
        pokemons: [
            { entry: 18, level: 61 },
            { entry: 65, level: 59 },
            { entry: 112, level: 61 },
            { entry: 103, level: 63 },
            { entry: 59, level: 61 },
            { entry: 9, level: 65 },
        ],
    });

    // Retrieve all posts by user with email alice@prisma.io
    const teams = await prisma.team.findMany({
        include: {
            pokemons: true,
        },
    });
    console.log("Voici toutes les équipes en base de donnée : ");
    beautify.jsonBeautify(teams);
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
