import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { User, Mail, Save, Loader2, Phone, Calendar, LayoutDashboard, Clock } from "lucide-react";
import clsx from "clsx";

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

    // Profile State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Bookings State
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeTab, setActiveTab] = useState<'account' | 'bookings'>('account');

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
        } catch (error) {
            setProfileMessage({ type: "error", text: "Failed to update profile." });
        } finally {
            setIsProfileLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    const sidebarLinks = [
        { name: "Account", id: 'account', icon: LayoutDashboard },
        { name: "My Booking", id: 'bookings', icon: Calendar },
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
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                            {activeTab === 'account' ? (
                                <>
                                    <div className="px-6 py-6 border-b border-gray-100">
                                        <h2 className="text-xl font-serif font-bold text-gray-900">Account Settings</h2>
                                        <p className="text-sm text-gray-500 mt-1">Update your personal information</p>
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
                                                    Full Name
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
                                                    Email Address
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
                                                    Phone Number
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
                                                            Updating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save size={20} />
                                                            Save Changes
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
                                        <h2 className="text-xl font-serif font-bold text-gray-900">My Bookings</h2>
                                        <p className="text-sm text-gray-500 mt-1">View your booking history</p>
                                    </div>
                                    <div className="p-6">
                                        {bookings.length === 0 ? (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                                    <Calendar size={32} />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings found</h3>
                                                <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                                                <Link
                                                    href="/villas"
                                                    className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                                                >
                                                    Browse Villas
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

                                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                                                <div>
                                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Total Price</span>
                                                                    <div className="text-lg font-bold text-emerald-900">฿{booking.totalPrice.toLocaleString()}</div>
                                                                </div>
                                                                <Link
                                                                    href={`/villas/${booking.villaId}`}
                                                                    className="text-emerald-600 font-medium hover:text-emerald-700 text-sm"
                                                                >
                                                                    View Villa
                                                                </Link>
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
        </div>
    );
}
