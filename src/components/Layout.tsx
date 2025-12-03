import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function Layout({ children, title = "Khao Yai Pool Villas" }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-cream-50">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Luxury Pool Villas in Khao Yai" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main className="flex-grow pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
}
