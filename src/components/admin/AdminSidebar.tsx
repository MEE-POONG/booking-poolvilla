import Link from "next/link";
import { useRouter } from "next/router";
import {
    BarChart3,
    Home,
    Calendar,
    Users,
    LogOut,
    LayoutDashboard,
    Palmtree
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const AdminSidebar = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const { t } = useLanguage();

    const menuItems = [
        {
            title: t('admin.menu.overview'),
            icon: <LayoutDashboard size={20} />,
            path: "/admin"
        },
        {
            title: t('admin.menu.villas'),
            icon: <Palmtree size={20} />,
            path: "/admin/villas"
        },
        {
            title: t('admin.menu.bookings'),
            icon: <Calendar size={20} />,
            path: "/admin/bookings"
        },
        {
            title: t('admin.menu.users'),
            icon: <Users size={20} />,
            path: "/admin/users"
        },
        {
            title: t('admin.menu.back_to_site'),
            icon: <Home size={20} />,
            path: "/"
        },
    ];

    return (
        <aside className="w-64 bg-emerald-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-all duration-300">
            <div className="p-6 border-b border-emerald-800">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-serif font-bold tracking-tight">{t('admin.cms_title')}</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = router.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? "bg-emerald-600 text-white shadow-lg"
                                : "text-emerald-100 hover:bg-emerald-800 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-emerald-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-emerald-100 hover:bg-red-900/50 hover:text-red-200 transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">{t('nav.logout')}</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
