import AdminLayout from "@/components/admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Calendar,
    ChevronLeft,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    Phone,
    Mail,
    Check,
    LogIn,
    LogOut,
    Receipt,
    Home
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AdminBooking {
    id: string;
    customer: string;
    email: string;
    phone: string;
    villa: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: string;
    date: string;
    avatar: string;
    actualCheckIn: string | null;
    actualCheckOut: string | null;
}

export default function AdminBookingDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useLanguage();
    const [booking, setBooking] = useState<AdminBooking | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalData, setModalData] = useState<{ id: string, type: 'checkIn' | 'checkOut' } | null>(null);
    const [timeInput, setTimeInput] = useState("");

    useEffect(() => {
        if (!id) return;

        const stored = localStorage.getItem("admin_bookings");
        if (stored) {
            const bookings: AdminBooking[] = JSON.parse(stored);
            const found = bookings.find(b => b.id === id);
            setBooking(found || null);
        }
        setIsLoading(false);
    }, [id]);

    const updateBooking = (updatedFields: Partial<AdminBooking>) => {
        if (!booking) return;
        const newBooking = { ...booking, ...updatedFields };
        setBooking(newBooking);

        const stored = localStorage.getItem("admin_bookings");
        if (stored) {
            const bookings: AdminBooking[] = JSON.parse(stored);
            const updatedBookings = bookings.map(b => b.id === booking.id ? newBooking : b);
            localStorage.setItem("admin_bookings", JSON.stringify(updatedBookings));
        }
    };

    const handleActualTime = () => {
        if (!modalData) return;
        const updates: Partial<AdminBooking> = {};
        if (modalData.type === 'checkIn') {
            updates.status = 'Checked-in';
            updates.actualCheckIn = timeInput;
        } else {
            updates.status = 'Checked-out';
            updates.actualCheckOut = timeInput;
        }
        updateBooking(updates);
        setModalData(null);
        setTimeInput("");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "Pending": return "bg-amber-50 text-amber-700 border-amber-100";
            case "Cancelled": return "bg-red-50 text-red-700 border-red-100";
            case "Checked-in": return "bg-blue-50 text-blue-700 border-blue-100";
            case "Checked-out": return "bg-gray-100 text-gray-700 border-gray-200";
            default: return "bg-gray-50 text-gray-700 border-gray-100";
        }
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
            </AdminLayout>
        );
    }

    if (!booking) {
        return (
            <AdminLayout>
                <div className="p-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 border-current/20">Booking Not Found</h1>
                    <Link href="/admin/bookings" className="text-emerald-600 hover:underline mt-4 block">
                        Back to All Bookings
                    </Link>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-8">
                <Link
                    href="/admin/bookings"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition-colors text-sm font-medium"
                >
                    <ChevronLeft size={16} />
                    Back to Bookings
                </Link>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                            Booking Details #{booking.id}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${getStatusColor(booking.status)}`}>
                                {booking.status}
                            </span>
                            <span className="text-gray-500 text-sm">
                                Booked on {new Date(booking.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {booking.status === "Pending" && (
                            <>
                                <button
                                    onClick={() => updateBooking({ status: "Confirmed" })}
                                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
                                >
                                    <CheckCircle2 size={18} />
                                    Confirm Booking
                                </button>
                                <button
                                    onClick={() => updateBooking({ status: "Cancelled" })}
                                    className="px-6 py-2.5 bg-white text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center gap-2"
                                >
                                    <XCircle size={18} />
                                    Cancel
                                </button>
                            </>
                        )}
                        {booking.status === "Confirmed" && (
                            <>
                                <button
                                    onClick={() => {
                                        setModalData({ id: booking.id, type: 'checkIn' });
                                        setTimeInput(new Date().toTimeString().slice(0, 5));
                                    }}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
                                >
                                    <LogIn size={18} />
                                    Check-in
                                </button>
                                <button
                                    onClick={() => updateBooking({ status: "Cancelled" })}
                                    className="px-6 py-2.5 bg-white text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center gap-2"
                                >
                                    <XCircle size={18} />
                                    Cancel
                                </button>
                            </>
                        )}
                        {booking.status === "Checked-in" && (
                            <button
                                onClick={() => {
                                    setModalData({ id: booking.id, type: 'checkOut' });
                                    setTimeInput(new Date().toTimeString().slice(0, 5));
                                }}
                                className="px-6 py-2.5 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition-all shadow-sm flex items-center gap-2"
                            >
                                <LogOut size={18} />
                                Check-out
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Customer Information */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="text-emerald-600" size={20} />
                            Customer Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Full Name</p>
                                    <p className="text-lg font-bold text-gray-900">{booking.customer}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="text-gray-400" size={16} />
                                    <span className="text-gray-600">{booking.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="text-gray-400" size={16} />
                                    <span className="text-gray-600">{booking.phone}</span>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end items-center">
                                <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-black">
                                    {booking.avatar}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stay Details */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Home className="text-emerald-600" size={20} />
                            Stay Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Villa</p>
                                    <p className="text-lg font-bold text-gray-900">{booking.villa}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Check-in Date</p>
                                        <div className="flex items-center gap-2 font-bold text-gray-900">
                                            <Calendar size={16} className="text-emerald-600" />
                                            {booking.checkIn}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Check-out Date</p>
                                        <div className="flex items-center gap-2 font-bold text-gray-900">
                                            <Calendar size={16} className="text-emerald-600" />
                                            {booking.checkOut}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-gray-900 text-sm">Operational Timeline</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <LogIn size={14} /> Actual Check-in
                                        </span>
                                        <span className="font-mono text-sm font-bold text-blue-600">
                                            {booking.actualCheckIn || "Not recorded"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <LogOut size={14} /> Actual Check-out
                                        </span>
                                        <span className="font-mono text-sm font-bold text-gray-600">
                                            {booking.actualCheckOut || "Not recorded"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Financial Summary */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Receipt className="text-emerald-600" size={20} />
                            Payment
                        </h2>
                        <div className="pb-4 mb-4 border-b border-gray-100 flex justify-between items-center">
                            <span className="text-gray-500">Booking Amount</span>
                            <span className="text-lg font-bold text-gray-900">฿{booking.totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-xl text-emerald-900 font-bold">
                            <span>Total Due</span>
                            <span className="text-xl">฿{booking.totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="mt-4 text-xs text-center text-gray-400">
                            {booking.status === "Confirmed" ? "✓ All payments received" : "Pending payment verification"}
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-white">
                        <h3 className="text-lg font-bold mb-4">Internal Notes</h3>
                        <textarea
                            className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                            placeholder="Add internal notes about this booking..."
                        ></textarea>
                        <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold transition-all text-sm">
                            Save Notes
                        </button>
                    </div>
                </div>
            </div>

            {/* Time Recording Modal */}
            {modalData && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                                Record {modalData.type === 'checkIn' ? 'Check-in' : 'Check-out'}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Enter the actual time for {modalData.id}.
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="time"
                                        value={timeInput}
                                        onChange={(e) => setTimeInput(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setModalData(null)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleActualTime}
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Check size={16} />
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
