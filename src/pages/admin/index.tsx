import AdminLayout from "@/components/admin/AdminLayout";
import {
    Users,
    Palmtree,
    CalendarCheck,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminDashboard() {
    const { t } = useLanguage();

    const stats = [
        {
            title: t('admin.stats.bookings'),
            value: "154",
            change: "+12.5%",
            isPositive: true,
            icon: <CalendarCheck className="text-emerald-600" size={24} />,
            color: "bg-emerald-50"
        },
        {
            title: t('admin.stats.villas'),
            value: "12",
            change: "0%",
            isPositive: true,
            icon: <Palmtree className="text-blue-600" size={24} />,
            color: "bg-blue-50"
        },
        {
            title: t('admin.stats.users'),
            value: "842",
            change: "+15.3%",
            isPositive: true,
            icon: <Users className="text-purple-600" size={24} />,
            color: "bg-purple-50"
        },
        {
            title: t('admin.stats.revenue'),
            value: "฿842,000",
            change: "-2.4%",
            isPositive: false,
            icon: <TrendingUp className="text-amber-600" size={24} />,
            color: "bg-amber-50"
        }
    ];

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900">{t('admin.overview')}</h1>
                <p className="text-gray-600">{t('admin.welcome')}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                                {stat.change}
                                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <h2 className="text-xl font-bold mb-4">{t('admin.activity_chart')}</h2>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-serif italic">
                        Chart Visualization Placeholder
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">{t('admin.recent_bookings')}</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
                                        JD
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 leading-tight">John Doe</h4>
                                        <p className="text-xs text-gray-500">Villa Emerald • 2 nights</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 leading-tight">฿12,400</p>
                                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                        {t('admin.confirmed')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
