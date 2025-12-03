import Layout from "@/components/Layout";
import VillaCard from "@/components/VillaCard";
import { villas } from "@/data/villas";

export default function VillasPage() {
    return (
        <Layout title="Our Villas - Khao Yai Pool Villas">
            <div className="bg-emerald-900 py-20 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Exclusive Villas</h1>
                <p className="text-emerald-100 max-w-2xl mx-auto px-4">
                    Choose from our hand-picked collection of luxury pool villas, each offering a unique experience in the heart of Khao Yai.
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {villas.map((villa) => (
                        <VillaCard key={villa.id} villa={villa} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
