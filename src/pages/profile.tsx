import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { User, Mail, Save, Loader2, Phone, Calendar, LayoutDashboard, Clock, CreditCard, QrCode, Building2, Upload, X, Shield, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/context/LanguageContext";

interface Booking {
    id: string;
    villaId: string;
    villaName: string;
    villaImage: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: string;
    date: string;
    userEmail: string;
}

export default function Profile() {
    const { user, updateProfile, isAuthenticated } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    // Profile State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Bookings State
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeTab, setActiveTab] = useState<'account' | 'bookings'>('account');

    // Payment Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        } else if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || "");

            // Load bookings
            const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            const userBookings = storedBookings.filter((b: Booking) => b.userEmail === user.email);
            setBookings(userBookings);
        }
    }, [isAuthenticated, user, router]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProfileLoading(true);
        setProfileMessage(null);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            updateProfile(name, email, phone);
            setProfileMessage({ type: "success", text: "Profile updated successfully!" });
        } catch {
            setProfileMessage({ type: "error", text: "Failed to update profile." });
        } finally {
            setIsProfileLoading(false);
        }
    };

    const openPaymentModal = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsPaymentModalOpen(true);
        setPaymentMethod('qr'); // Default to QR
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setSelectedBooking(null);
    };

    const handleCancel = (bookingId: string) => {
        if (!window.confirm(t('booking_detail.cancel_confirm'))) return;

        const allStoredBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const updatedAllBookings = allStoredBookings.map((b: Booking) =>
            b.id === bookingId ? { ...b, status: 'Cancelled' } : b
        );
        localStorage.setItem("bookings", JSON.stringify(updatedAllBookings));

        // Update local state
        setBookings((prev: Booking[]) => prev.map((b: Booking) => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    };

    const handlePaymentSubmit = async () => {
        if (!selectedBooking) return;

        setIsProcessingPayment(true);
        try {
            // Simulate payment processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Update booking status in local state and localStorage
            const updatedBookings = bookings.map(b =>
                b.id === selectedBooking.id ? { ...b, status: 'Confirmed' } : b
            );
            setBookings(updatedBookings);

            // Update localStorage (need to update all bookings, not just filtered ones)
            const allStoredBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            const updatedAllBookings = allStoredBookings.map((b: Booking) =>
                b.id === selectedBooking.id ? { ...b, status: 'Confirmed' } : b
            );
            localStorage.setItem("bookings", JSON.stringify(updatedAllBookings));

            closePaymentModal();
            // Optional: Show success message
        } catch (error) {
            console.error("Payment failed", error);
        } finally {
            setIsProcessingPayment(false);
        }
    };

    if (!user) {
        return null;
    }

    const sidebarLinks = [
        { name: t('profile.sidebar.account'), id: 'account', icon: LayoutDashboard },
        { name: t('profile.sidebar.bookings'), id: 'bookings', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 container mx-auto">
                <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 text-center border-b border-gray-100">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                                    <User size={40} />
                                </div>
                                <h3 className="font-serif font-bold text-gray-900 text-lg">{user.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                            </div>
                            <nav className="p-2">
                                {sidebarLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => setActiveTab(link.id as 'account' | 'bookings')}
                                        className={clsx(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            activeTab === link.id
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <link.icon size={18} />
                                        {link.name}
                                    </button>
                                ))}
                                {user?.role === "admin" && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 px-2 pb-2">
                                        <Link
                                            href="/admin"
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                                        >
                                            <Shield size={18} />
                                            {t('nav.admin')}
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                            {activeTab === 'account' ? (
                                <>
                                    <div className="px-6 py-6 border-b border-gray-100">
                                        <h2 className="text-xl font-serif font-bold text-gray-900">{t('profile.account_settings')}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{t('profile.update_info')}</p>
                                    </div>

                                    <div className="p-6">
                                        {profileMessage && (
                                            <div
                                                className={`mb-6 p-4 rounded-lg text-sm font-medium ${profileMessage.type === "success"
                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                    : "bg-red-50 text-red-700 border border-red-200"
                                                    }`}
                                            >
                                                {profileMessage.text}
                                            </div>
                                        )}

                                        <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                    {t('profile.full_name')}
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User size={18} className="text-gray-400" />
                                                    </div>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                    {t('profile.email')}
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail size={18} className="text-gray-400" />
                                                    </div>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                    {t('profile.phone')}
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone size={18} className="text-gray-400" />
                                                    </div>
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all outline-none"
                                                        placeholder="0812345678"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isProfileLoading}
                                                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {isProfileLoading ? (
                                                        <>
                                                            <Loader2 size={20} className="animate-spin" />
                                                            {t('profile.saving')}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save size={20} />
                                                            {t('profile.save_changes')}
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="px-6 py-6 border-b border-gray-100">
                                        <h2 className="text-xl font-serif font-bold text-gray-900">{t('profile.my_bookings')}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{t('profile.view_history')}</p>
                                    </div>
                                    <div className="p-6">
                                        {bookings.length === 0 ? (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                                    <Calendar size={32} />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('profile.no_bookings')}</h3>
                                                <p className="text-gray-500 mb-6">{t('profile.no_bookings_desc')}</p>
                                                <Link
                                                    href="/villas"
                                                    className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                                                >
                                                    {t('profile.browse_villas')}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {bookings.map((booking) => (
                                                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                                                        <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                                                            <Image
                                                                src={booking.villaImage}
                                                                alt={booking.villaName}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h3 className="text-lg font-serif font-bold text-gray-900">
                                                                        {booking.villaName}
                                                                    </h3>
                                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                                        }`}>
                                                                        {booking.status}
                                                                    </span>
                                                                </div>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
                                                                    <div className="flex items-center gap-2">
                                                                        <Calendar size={16} className="text-emerald-500" />
                                                                        <span>{t('profile.check_in')}: {booking.checkIn}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Calendar size={16} className="text-emerald-500" />
                                                                        <span>{t('profile.check_out')}: {booking.checkOut}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Clock size={16} className="text-emerald-500" />
                                                                        <span>{t('profile.booked_on')}: {new Date(booking.date).toLocaleDateString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                                                <div>
                                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{t('profile.total_price')}</span>
                                                                    <div className="text-lg font-bold text-emerald-900">฿{booking.totalPrice.toLocaleString()}</div>
                                                                </div>

                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    {booking.status === 'Pending' && (
                                                                        <>
                                                                            <button
                                                                                onClick={() => openPaymentModal(booking)}
                                                                                className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                                                                            >
                                                                                <CreditCard size={14} />
                                                                                {t('profile.pay_now')}
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleCancel(booking.id)}
                                                                                className="bg-white text-red-600 border border-red-100 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-1.5"
                                                                            >
                                                                                <X size={14} />
                                                                                {t('booking_detail.cancel_booking')}
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    <Link
                                                                        href={`/bookings/${booking.id}`}
                                                                        className="text-emerald-600 font-bold hover:text-emerald-700 text-sm px-2 py-1 flex items-center gap-1"
                                                                    >
                                                                        {t('profile.view_detail')}
                                                                        <ChevronRight size={14} />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {isPaymentModalOpen && selectedBooking && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h3 className="text-lg font-serif font-bold text-gray-900">Payment</h3>
                            <button onClick={closePaymentModal} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-1">Booking for</p>
                                <h4 className="font-bold text-gray-900">{selectedBooking.villaName}</h4>
                                <div className="flex justify-between items-center mt-2 p-3 bg-emerald-50 rounded-lg">
                                    <span className="text-sm font-medium text-emerald-800">Total Amount</span>
                                    <span className="text-lg font-bold text-emerald-700">฿{selectedBooking.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setPaymentMethod('qr')}
                                    className={clsx(
                                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
                                        paymentMethod === 'qr' ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                    )}
                                >
                                    <QrCode size={18} />
                                    Scan QR
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('bank')}
                                    className={clsx(
                                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
                                        paymentMethod === 'bank' ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                    )}
                                >
                                    <Building2 size={18} />
                                    Bank Transfer
                                </button>
                            </div>

                            <div className="mb-6">
                                {paymentMethod === 'qr' ? (
                                    <div className="text-center">
                                        <div className="bg-white border border-gray-200 rounded-xl p-4 inline-block mb-4">
                                            {/* Placeholder for QR Code */}
                                            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                <QrCode size={64} />
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">Scan this QR code to pay via PromptPay</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                    <Building2 size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Kasikorn Bank</p>
                                                    <p className="text-xs text-gray-500">Savings Account</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Account No.</span>
                                                    <span className="font-mono font-medium text-gray-900">123-4-56789-0</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Account Name</span>
                                                    <span className="font-medium text-gray-900">Khao Yai Villas Co., Ltd.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <button className="w-full border border-dashed border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                                    <Upload size={18} />
                                    Upload Payment Slip
                                </button>

                                <button
                                    onClick={handlePaymentSubmit}
                                    disabled={isProcessingPayment}
                                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isProcessingPayment ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Confirm Payment"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
