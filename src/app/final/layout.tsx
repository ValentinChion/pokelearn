"use client";
import Image from "next/image";
import "./header.css";
import { useRouter } from "next/navigation";

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    return (
        <div>
            <div className="header">
                <div className="headerClick" onClick={() => router.push("/")}>
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={45}
                        height={45}
                    />
                    <div className="headerTitle">Pokélearn</div>
                </div>
            </div>
            <div className="page">{children}</div>
        </div>
    );
}
