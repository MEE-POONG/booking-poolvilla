import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    ChevronLeft,
    Printer,
    CheckCircle2,
    Clock3,
    XCircle,
    Receipt,
    Home
} from "lucide-react";
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

export default function BookingDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useLanguage();
    const { user, isAuthenticated } = useAuth();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Redirect if not logged in
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        if (!id) return;

        // Simulate data fetching from localStorage
        const storedBookings = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("bookings") || "[]") : [];
        const foundBooking = storedBookings.find((b: Booking) => b.id === id);

        // Also check admin mock bookings if not found (for demo purposes)
        if (!foundBooking && id === "BK-1001") {
            setBooking({
                id: "BK-1001",
                villaId: "1",
                villaName: "Mountain Breeze Villa",
                villaImage: "/images/villa-1.png",
                checkIn: "2026-01-20",
                checkOut: "2026-01-22",
                guests: 4,
                totalPrice: 17000,
                status: "Confirmed",
                date: "2026-01-10",
                userEmail: "demo@example.com"
            });
        } else {
            setBooking(foundBooking || null);
        }

        setIsLoading(false);
    }, [id]);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: <CheckCircle2 size={16} /> };
            case 'Pending':
                return { bg: 'bg-amber-50', text: 'text-amber-700', icon: <Clock3 size={16} /> };
            case 'Cancelled':
                return { bg: 'bg-red-50', text: 'text-red-700', icon: <XCircle size={16} /> };
            default:
                return { bg: 'bg-gray-50', text: 'text-gray-700', icon: <Clock3 size={16} /> };
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
            </Layout>
        );
    }

    if (!booking) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-24 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                        <Receipt size={40} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Booking Not Found</h1>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        We couldn&apos;t find the booking details you&apos;re looking for. It might have been deleted or the ID is incorrect.
                    </p>
                    <Link
                        href="/bookings"
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Back to My Bookings
                    </Link>
                </div>
            </Layout>
        );
    }

    const statusStyle = getStatusStyles(booking.status);

    return (
        <Layout title={`Booking ${booking.id} - Khao Yai Pool Villas`}>
            <div className="bg-emerald-900 pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    <Link
                        href="/bookings"
                        className="inline-flex items-center gap-2 text-emerald-100/80 hover:text-white mb-6 transition-colors text-sm"
                    >
                        <ChevronLeft size={16} />
                        {t('nav.bookings')}
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                                Booking #{booking.id}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border ${statusStyle.bg} ${statusStyle.text} border-current/20`}>
                                    {statusStyle.icon}
                                    {booking.status}
                                </span>
                                <span className="text-emerald-100/60 text-sm">
                                    {t('profile.booked_on')} {new Date(booking.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all text-sm font-medium backdrop-blur-sm">
                                <Printer size={18} />
                                Print Confirmation
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>

                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Stay Summary</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t('profile.check_in')}</p>
                                            <p className="text-lg font-bold text-gray-900">{booking.checkIn}</p>
                                            <p className="text-sm text-gray-500">From 14:00 PM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t('villa.guests')}</p>
                                            <p className="text-lg font-bold text-gray-900">{booking.guests} {t('villa.guests')}</p>
                                            <p className="text-sm text-gray-500">Adults & Children</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t('profile.check_out')}</p>
                                            <p className="text-lg font-bold text-gray-900">{booking.checkOut}</p>
                                            <p className="text-sm text-gray-500">Until 12:00 PM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                            <Receipt size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{t('profile.total_price')}</p>
                                            <p className="text-xl font-black text-emerald-900">฿{booking.totalPrice.toLocaleString()}</p>
                                            <p className="text-sm text-emerald-600 font-medium">Payment {booking.status === 'Confirmed' ? 'Received' : 'Pending'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Villa Info */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Villa Details</h2>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="relative w-full md:w-64 h-48 md:h-40 rounded-2xl overflow-hidden shrink-0">
                                    <Image
                                        src={booking.villaImage}
                                        alt={booking.villaName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.villaName}</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                        <MapPin size={16} className="text-emerald-500" />
                                        Khao Yai, Pak Chong
                                    </div>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                        Experience the ultimate luxury in our private pool villa. Surrounded by lush nature and mountain views.
                                    </p>
                                    <Link
                                        href={`/villas/${booking.villaId}`}
                                        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                                    >
                                        <Home size={18} />
                                        View Villa Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions & Contact */}
                    <div className="space-y-6">
                        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                            <h3 className="text-lg font-bold text-emerald-900 mb-4">Need Help?</h3>
                            <p className="text-emerald-800/70 text-sm mb-8 leading-relaxed">
                                If you have any questions about your booking or need to make changes, our concierge team is available 24/7.
                            </p>
                            <div className="space-y-4">
                                <a href="tel:+66812345678" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-emerald-200 text-emerald-900 font-bold hover:shadow-md transition-all">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <Clock size={20} />
                                    </div>
                                    Call Concierge
                                </a>
                                <a href="mailto:support@poolvilla.com" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-emerald-200 text-emerald-900 font-bold hover:shadow-md transition-all">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <Users size={20} />
                                    </div>
                                    Email Support
                                </a>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Policies</h3>
                            <ul className="space-y-3">
                                <li className="text-sm text-gray-500 flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    Standard Check-in: 14:00 PM
                                </li>
                                <li className="text-sm text-gray-500 flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    Standard Check-out: 12:00 PM
                                </li>
                                <li className="text-sm text-gray-500 flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                    Cancellation: Free up to 7 days before arrival
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
