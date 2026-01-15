import { useState } from "react";
import { useRouter } from "next/router";
import { villas } from "@/data/villas";
import { Calendar, Users, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function BookingForm() {
    const router = useRouter();
    const { villaId } = router.query;
    const { user, isAuthenticated } = useAuth();
    const { t } = useLanguage();

    const [selectedVilla, setSelectedVilla] = useState(typeof villaId === 'string' ? villaId : "");
    const [formData, setFormData] = useState(() => ({
        name: user?.name || "",
        email: user?.email.includes("@") ? user.email : "",
        phone: user?.email && !user.email.includes("@") ? user.email : "",
        checkIn: "",
        checkOut: "",
        guests: 2,
        message: "",
    }));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create Booking Object
        const villa = villas.find(v => v.id === selectedVilla);
        const newBooking = {
            id: Math.random().toString(36).substr(2, 9),
            villaId: selectedVilla,
            villaName: villa?.name || "Unknown Villa",
            villaImage: villa?.imageUrl || "",
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            guests: formData.guests,
            totalPrice: villa ? villa.price : 0, // Simplified price calc
            status: "Pending",
            date: new Date().toISOString(),
            userEmail: user?.email || formData.email // Associate with user if logged in
        };

        // Save to LocalStorage
        const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        localStorage.setItem("bookings", JSON.stringify([newBooking, ...existingBookings]));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center py-16">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">{t('booking.success_title')}</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {t('booking.success_desc')}
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors"
                >
                    {t('booking.return_home')}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">{t('booking.title')}</h2>

            {!isAuthenticated && (
                <div className="mb-6 p-4 bg-emerald-50 rounded-lg text-sm text-emerald-800 flex justify-between items-center">
                    <span>{t('booking.sign_in_promo')}</span>
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-emerald-600 font-bold hover:underline"
                    >
                        {t('booking.login_here')}
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.select_villa')}</label>
                    <select
                        name="villa"
                        value={selectedVilla}
                        onChange={(e) => setSelectedVilla(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        required
                    >
                        <option value="">{t('booking.choose_villa')}</option>
                        {villas.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name} - ฿{v.price.toLocaleString()}{t('villa.night')}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.check_in_date')}</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.check_out_date')}</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.guests')}</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="number"
                            name="guests"
                            min="1"
                            max="20"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.full_name')}</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.email')}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.phone')}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+66 81 234 5678"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.special_requests')}</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t('booking.special_requests_placeholder')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                    ></textarea>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? t('booking.processing') : t('booking.confirm_button')}
            </button>
        </form>
    );
}
