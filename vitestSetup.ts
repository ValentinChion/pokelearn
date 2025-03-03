import nextRouterMock from "next-router-mock";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { join } from "path";
import { URL } from "url";
import { v4 } from "uuid";
import { afterEach, beforeEach, vi, beforeAll } from "vitest";

vi.stubEnv("DATABASE_URL", "postgresql://testuser:qsd@localhost:5432/testdb");

const generateDatabaseURL = (schema: string) => {
    if (!process.env.DATABASE_URL) {
        throw new Error("please provide a database url");
    }
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.append("schema", schema);
    return url.toString();
};

const schemaId = `test-${v4()}`;
const prismaBinary = join(__dirname, "node_modules", ".bin", "prisma");

const url = generateDatabaseURL(schemaId);

beforeEach(async () => {
    vi.stubEnv("DATABASE_URL", url);

    execSync(`${prismaBinary} db push --accept-data-loss`);

    vi.mock("next/router", () => nextRouterMock);
    vi.mock("next/navigation", () => {
        return {
            __esModule: true,
            usePathname: () => ({
                pathname: "",
            }),
            useRouter: () => ({
                push: vi.fn(),
                replace: vi.fn(),
                prefetch: vi.fn(),
            }),
            useSearchParams: () => ({
                get: () => {},
            }),
        };
    });

    vi.doMock("@/lib/prisma", () => {
        const prisma = new PrismaClient({
            datasources: { db: { url } },
        });

        return {
            prisma: prisma,
        };
    });
});

afterEach(async () => {
    const prisma = new PrismaClient({
        datasources: { db: { url } },
    });
    await prisma.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
    );
    await prisma.$disconnect();
});
