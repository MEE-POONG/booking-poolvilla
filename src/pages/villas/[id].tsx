import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { villas } from "@/data/villas";
import { Users, Bed, Bath, Maximize, Check, Calendar } from "lucide-react";

export default function VillaDetail() {
    const router = useRouter();
    const { id } = router.query;
    const villa = villas.find((v) => v.id === id);

    if (!villa) {
        return (
            <Layout>
                <div className="min-h-[50vh] flex items-center justify-center">
                    <p className="text-xl text-gray-500">Villa not found</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${villa.name} - Khao Yai Pool Villas`}>
            {/* Gallery Hero */}
            <div className="relative h-[60vh] min-h-[400px]">
                <Image
                    src={villa.imageUrl}
                    alt={villa.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto px-4 md:px-6">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">
                            {villa.name}
                        </h1>
                        <p className="text-xl text-emerald-100">
                            Starting from ฿{villa.price.toLocaleString()} / night
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {villa.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                                <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-xl text-center">
                                    <Users className="text-emerald-600 mb-2" size={24} />
                                    <span className="font-semibold text-gray-900">{villa.guests} Guests</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-xl text-center">
                                    <Bed className="text-emerald-600 mb-2" size={24} />
                                    <span className="font-semibold text-gray-900">{villa.bedrooms} Bedrooms</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-xl text-center">
                                    <Bath className="text-emerald-600 mb-2" size={24} />
                                    <span className="font-semibold text-gray-900">{villa.bathrooms} Bathrooms</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-xl text-center">
                                    <Maximize className="text-emerald-600 mb-2" size={24} />
                                    <span className="font-semibold text-gray-900">{villa.size} m²</span>
                                </div>
                            </div>
                        </section>

                        {/* Features */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Amenities & Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {villa.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-emerald-600" />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Gallery Grid */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {villa.images.map((img, idx) => (
                                    <div key={idx} className="relative h-64 rounded-xl overflow-hidden">
                                        <Image
                                            src={img}
                                            alt={`${villa.name} ${idx + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="mb-6">
                                <span className="text-gray-500 text-sm">Price per night</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-emerald-900">฿{villa.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Check-in - Check-out</div>
                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                        <Calendar size={18} className="text-emerald-600" />
                                        Select Dates
                                    </div>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Guests</div>
                                    <div className="font-medium text-gray-900">{villa.guests} Guests</div>
                                </div>
                            </div>

                            <Link
                                href={`/book?villaId=${villa.id}`}
                                className="block w-full bg-emerald-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Book Now
                            </Link>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                You won't be charged yet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
