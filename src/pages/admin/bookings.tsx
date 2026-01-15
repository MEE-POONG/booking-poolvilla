import AdminLayout from "@/components/admin/AdminLayout";
import {
    Calendar,
    Search,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    Phone,
    Mail,
    Download
} from "lucide-react";
import Image from "next/image";

export default function BookingManagement() {
    const mockBookings = [
        {
            id: "BK-1001",
            customer: "John Doe",
            email: "john@example.com",
            phone: "081-234-5678",
            villa: "Mountain Breeze Villa",
            checkIn: "2026-01-20",
            checkOut: "2026-01-22",
            totalPrice: 17000,
            status: "Confirmed",
            date: "2026-01-10",
            avatar: "JD"
        },
        {
            id: "BK-1002",
            customer: "Alice Smith",
            email: "alice@example.com",
            phone: "082-345-6789",
            villa: "Forest Hideaway",
            checkIn: "2026-01-25",
            checkOut: "2026-01-28",
            totalPrice: 36000,
            status: "Pending",
            date: "2026-01-12",
            avatar: "AS"
        },
        {
            id: "BK-1003",
            customer: "Bob Wilson",
            email: "bob@example.com",
            phone: "083-456-7890",
            villa: "Romantic Pool Suite",
            checkIn: "2026-02-01",
            checkOut: "2026-02-03",
            totalPrice: 11000,
            status: "Cancelled",
            date: "2026-01-14",
            avatar: "BW"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "Pending": return "bg-amber-50 text-amber-700 border-amber-100";
            case "Cancelled": return "bg-red-50 text-red-700 border-red-100";
            default: return "bg-gray-50 text-gray-700 border-gray-100";
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Bookings Management</h1>
                    <p className="text-gray-600">Track and manage all villa reservations.</p>
                </div>
                <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                    <Download size={20} />
                    Export CSV
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID, customer or villa..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-600">
                        <option>All Status</option>
                        <option>Confirmed</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm text-gray-600"
                    />
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Villa / Dates</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-sm font-bold text-emerald-700">
                                        {booking.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                                                {booking.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 leading-tight text-sm">{booking.customer}</h4>
                                                <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <Mail size={10} /> {booking.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <h4 className="font-medium text-gray-900 leading-tight">{booking.villa}</h4>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <Calendar size={12} /> {booking.checkIn} → {booking.checkOut}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                        ฿{booking.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            {booking.status === "Pending" && (
                                                <>
                                                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Confirm">
                                                        <CheckCircle2 size={18} />
                                                    </button>
                                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Cancel">
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 3 of 42 bookings</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
