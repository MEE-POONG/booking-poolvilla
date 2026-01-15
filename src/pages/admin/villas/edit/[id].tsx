import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { villas, Villa } from "@/data/villas";
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Plus,
    Trash2,
    Loader2,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditVilla() {
    const router = useRouter();
    const { id } = router.query;

    const [villa, setVilla] = useState<Villa | null>(null);
    const [formData, setFormData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            const foundVilla = villas.find(v => v.id === id);
            if (foundVilla) {
                setVilla(foundVilla);
                setFormData({ ...foundVilla });
            }
            setIsLoading(false);
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: name === 'price' || name === 'guests' || name === 'bedrooms' || name === 'bathrooms' || name === 'size'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData((prev: any) => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData((prev: any) => ({ ...prev, features: [...prev.features, ""] }));
    };

    const removeFeature = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            features: prev.features.filter((_: any, i: number) => i !== index)
        }));
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

    if (isLoading || !formData) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="animate-spin text-emerald-600" size={40} />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/admin/villas" className="text-sm text-emerald-600 flex items-center gap-1 hover:underline mb-2">
                        <ArrowLeft size={14} /> Back to Villas
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Edit Villa: {villa?.name}</h1>
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
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {success && (
                <div className="mb-6 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 size={20} />
                    <p className="font-medium">Changes saved successfully! Redirecting...</p>
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
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Features & Amenities</h2>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-sm font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700"
                            >
                                <Plus size={16} /> Add Feature
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.features.map((feature: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                                        placeholder="e.g. Free Wi-Fi"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shadow-sm"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar details */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Main Image</h2>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 group cursor-pointer">
                            <Image
                                src={formData.imageUrl}
                                alt="Main"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="text-white text-sm font-bold flex items-center gap-2">
                                    <ImageIcon size={20} />
                                    Change Image
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center italic">Supported formats: JPG, PNG. Max size: 2MB</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Settings</h2>
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
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-tight">Featured</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Show on homepage</p>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
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
