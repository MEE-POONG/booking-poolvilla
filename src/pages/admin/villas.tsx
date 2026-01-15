import AdminLayout from "@/components/admin/AdminLayout";
import { villas } from "@/data/villas";
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Users,
    Bed,
    Maximize2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VillaManagement() {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Villas Management</h1>
                    <p className="text-gray-600">Manage your property listings and availability.</p>
                </div>
                <Link
                    href="/admin/villas/add"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md"
                >
                    <Plus size={20} />
                    Add New Villa
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search villas..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-600">
                        <option>All Status</option>
                        <option>Available</option>
                        <option>Maintenance</option>
                    </select>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-600">
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Villa Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Villa</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price/Night</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {villas.map((villa) => (
                                <tr key={villa.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                                <Image
                                                    src={villa.imageUrl}
                                                    alt={villa.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 leading-tight">{villa.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                    <Maximize2 size={12} /> {villa.size} sqm
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1"><Users size={14} /> {villa.guests}</span>
                                            <span className="flex items-center gap-1"><Bed size={14} /> {villa.bedrooms}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900">฿{villa.price.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            Available
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="View">
                                                <ExternalLink size={18} />
                                            </button>
                                            <Link
                                                href={`/admin/villas/edit/${villa.id}`}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 3 of 12 villas</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
