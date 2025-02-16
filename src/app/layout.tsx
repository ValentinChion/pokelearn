import type { Metadata } from "next";
import localFont from "next/font/local";

const pokeTypo = localFont({
    src: "./fonts/pokemon-emerald.ttf",
});

export const metadata: Metadata = {
    title: "Pokelearn",
    description:
        "Pokelearn est un projet d'apprentissage pour apprendre React, Next.js et les librairies nécessaires pour la plupart des projets front.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={pokeTypo.className}>
            <body>{children}</body>
        </html>
    );
}
