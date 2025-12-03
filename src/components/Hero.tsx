import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/hero-bg.png')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30">
                    Welcome to Paradise
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                    Escape to Nature's <br />
                    <span className="text-emerald-300">Luxury Embrace</span>
                </h1>
                <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Discover our exclusive collection of private pool villas in Khao Yai.
                    Where modern comfort meets breathtaking mountain views.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/villas"
                        className="bg-emerald-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                        Explore Villas
                        <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/20 transition-all flex items-center justify-center"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
