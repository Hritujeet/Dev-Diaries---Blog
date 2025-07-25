import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Query from "@/providers/Query";
import Auth from "@/providers/Auth";

export const metadata: Metadata = {
    title: "Dev Diaries - By Hritujeet",
    description:
        "Dev Diaries by Hritujeet – A personal journey through web development, coding challenges, tech experiments, and lessons learned. Follow along for real-world insights and tips from a passionate developer.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={"bg-gradient-to-br from-slate-50 to-blue-50"}>
                <Query>
                    <Auth>
                        <NextTopLoader height={2} />
                        <Navbar></Navbar>
                        <Toaster />
                        <main>{children}</main>
                        <Footer></Footer>
                    </Auth>
                </Query>
            </body>
        </html>
    );
}
