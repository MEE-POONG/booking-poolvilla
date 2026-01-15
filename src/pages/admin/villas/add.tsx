import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Loader2,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const PREDEFINED_AMENITIES = [
    "Private Infinity Pool",
    "Mountain View",
    "BBQ Grill",
    "Free Wi-Fi",
    "Smart TV",
    "Fully Equipped Kitchen",
    "Parking",
    "Large Private Pool",
    "Garden View",
    "Karaoke System",
    "Outdoor Dining Area",
    "Daily Housekeeping",
    "Welcome Drink",
    "Private Plunge Pool",
    "Sunset View",
    "King Size Bed",
    "Bathtub",
    "Mini Bar",
    "Room Service"
];

export default function AddVilla() {
    const router = useRouter();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        guests: 0,
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        imageUrl: "/images/villa-placeholder.png",
        features: ["Private Infinity Pool", "Mountain View"],
        images: ["/images/villa-placeholder.png"]
    });

    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'guests' || name === 'bedrooms' || name === 'bathrooms' || name === 'size'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleFeatureToggle = (feature: string) => {
        setFormData((prev) => {
            const isSelected = prev.features.includes(feature);
            const newFeatures = isSelected
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features: newFeatures };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSaving(false);
        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
            router.push("/admin/villas");
        }, 2000);
    };

    return (
        <AdminLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/admin/villas" className="text-sm text-emerald-600 flex items-center gap-1 hover:underline mb-2">
                        <ArrowLeft size={14} /> Back to Villas
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Add New Villa</h1>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md disabled:opacity-70"
                >
                    {isSaving ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Save size={20} />
                    )}
                    {isSaving ? "Saving..." : "Add Villa"}
                </button>
            </div>

            {success && (
                <div className="mb-6 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 size={20} />
                    <p className="font-medium">Villa created successfully! Redirecting...</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            General Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Villa Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Luxury Forest Retreat"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your villa..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night (฿)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Size (sqm)</label>
                                <input
                                    type="number"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
                                <input
                                    type="number"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Features & Amenities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {PREDEFINED_AMENITIES.map((feature) => (
                                <label
                                    key={feature}
                                    className={clsx(
                                        "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                        formData.features.includes(feature)
                                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                            : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                        checked={formData.features.includes(feature)}
                                        onChange={() => handleFeatureToggle(feature)}
                                    />
                                    <span className="text-sm font-medium">{feature}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar details */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Main Image</h2>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 group cursor-pointer flex items-center justify-center">
                            <div className="text-gray-400 flex flex-col items-center gap-2">
                                <ImageIcon size={40} />
                                <span className="text-sm font-medium">Upload Image</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center italic">Supported formats: JPG, PNG. Max size: 2MB</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Initial Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-tight">Published</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Visible on site</p>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
