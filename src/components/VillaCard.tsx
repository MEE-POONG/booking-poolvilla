import Link from "next/link";
import Image from "next/image";
import { Users, Bed, Bath, Maximize } from "lucide-react";

interface VillaProps {
    id: string;
    name: string;
    price: number;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    imageUrl: string;
    description: string;
}

export default function VillaCard({ villa }: { villa: VillaProps }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={villa.imageUrl}
                    alt={villa.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-emerald-800">
                    ฿{villa.price.toLocaleString()} / night
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {villa.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {villa.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-emerald-500" />
                        <span>{villa.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bed size={18} className="text-emerald-500" />
                        <span>{villa.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bath size={18} className="text-emerald-500" />
                        <span>{villa.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Maximize size={18} className="text-emerald-500" />
                        <span>{villa.size} m²</span>
                    </div>
                </div>

                <Link
                    href={`/villas/${villa.id}`}
                    className="block w-full text-center py-3 border border-emerald-600 text-emerald-600 rounded-xl font-medium hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
