import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, XCircle, CreditCard, ChevronRight } from "lucide-react";

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

export default function BookingsPage() {
    const { user, isAuthenticated } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && user) {
            const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            setBookings(storedBookings.filter((b: Booking) => b.userEmail === user.email));
            setIsLoading(false);
        }
    }, [user]);

    const handleCancel = (bookingId: string) => {
        if (!window.confirm(t('booking_detail.cancel_confirm'))) return;

        const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const updatedBookings = storedBookings.map((b: Booking) =>
            b.id === bookingId ? { ...b, status: 'Cancelled' } : b
        );
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        // Update local state
        setBookings((prev: Booking[]) => prev.map((b: Booking) => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    };

    useEffect(() => {
        // Redirect if not logged in
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="My Bookings - Khao Yai Pool Villas">
            <div className="bg-emerald-900 py-12 text-center text-white">
                <h1 className="text-3xl md:text-4xl font-serif font-bold">My Bookings</h1>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 min-h-[60vh]">
                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-6">You haven&apos;t made any bookings yet.</p>
                        <Link
                            href="/villas"
                            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors"
                        >
                            Browse Villas
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {bookings.map((booking: Booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                                <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
                                    <Image
                                        src={booking.villaImage}
                                        alt={booking.villaName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-serif font-bold text-gray-900">
                                                {booking.villaName}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-emerald-500" />
                                                <span>Check-in: {booking.checkIn}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-emerald-500" />
                                                <span>Check-out: {booking.checkOut}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-emerald-500" />
                                                <span>Booked on: {new Date(booking.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">Total Price</span>
                                            <div className="text-lg font-bold text-emerald-900">฿{booking.totalPrice.toLocaleString()}</div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                            {booking.status === 'Pending' && (
                                                <>
                                                    <Link
                                                        href={`/bookings/${booking.id}`}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors shadow-sm"
                                                    >
                                                        <CreditCard size={14} />
                                                        {t('profile.pay_now')}
                                                    </Link>
                                                    <button
                                                        onClick={() => handleCancel(booking.id)}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white text-red-600 border border-red-100 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                                                    >
                                                        <XCircle size={14} />
                                                        {t('booking_detail.cancel_booking')}
                                                    </button>
                                                </>
                                            )}
                                            <Link
                                                href={`/bookings/${booking.id}`}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
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
        </Layout>
    );
}
