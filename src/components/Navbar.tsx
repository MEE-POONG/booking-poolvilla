import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Calendar, User, LogOut, ChevronDown, LayoutDashboard, Shield, Globe } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: "/" },
        { name: t('nav.villas'), href: "/villas" },
        { name: t('nav.about'), href: "/about" },
        { name: t('nav.contact'), href: "/contact" },
    ];

    return (
        <nav
            className={clsx(
                "fixed w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold text-emerald-900">
                    Khao Yai <span className="text-emerald-600">Villas</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-emerald-600",
                                isScrolled ? "text-gray-800" : "text-gray-900"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                        className={clsx(
                            "flex items-center gap-2 text-sm font-medium transition-all px-3 py-1.5 rounded-full",
                            isScrolled
                                ? "text-gray-700 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 hover:shadow-sm"
                                : "text-gray-900 bg-white/50 backdrop-blur-sm hover:bg-white hover:text-emerald-700 hover:shadow-md border border-transparent hover:border-emerald-100"
                        )}
                        aria-label="Switch Language"
                    >
                        <Globe size={16} className={language === 'en' ? 'text-gray-500' : 'text-emerald-500'} />
                        <span>{language === 'en' ? 'EN' : 'TH'}</span>
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={clsx(
                                        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-600 focus:outline-none",
                                        isScrolled ? "text-gray-800" : "text-gray-900"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <User size={16} />
                                    </div>
                                    <span>{user?.name}</span>
                                    <ChevronDown size={16} className={clsx("transition-transform", isDropdownOpen && "rotate-180")} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-xs text-gray-500">{t('nav.signed_in_as')}</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <User size={16} />
                                            {t('nav.profile')}
                                        </Link>
                                        {user?.role === "admin" && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 font-medium"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <Shield size={16} />
                                                {t('nav.admin')}
                                            </Link>
                                        )}
                                        <Link
                                            href="/profile?tab=bookings"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Calendar size={16} />
                                            {t('nav.bookings')}
                                        </Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut size={16} />
                                            {t('nav.logout')}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/book"
                                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                <Calendar size={16} />
                                {t('nav.book_now')}
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-emerald-600",
                                    isScrolled ? "text-gray-800" : "text-gray-900"
                                )}
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/register"
                                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                {t('nav.register')}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-800"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-800 font-medium py-2 hover:text-emerald-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Language Switcher */}
                    <button
                        onClick={() => {
                            setLanguage(language === 'en' ? 'th' : 'en');
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-left text-gray-800 font-medium py-2 hover:text-emerald-600 transition-colors"
                    >
                        <Globe size={18} />
                        <span>Language: {language === 'en' ? 'English' : 'ไทย'}</span>
                    </button>

                    {isAuthenticated ? (
                        <>
                            <div className="py-2 border-t border-gray-100">
                                <div className="flex items-center gap-3 mb-4 px-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-emerald-600"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard size={18} />
                                    {t('nav.profile')}
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-emerald-600"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Calendar size={18} />
                                    {t('nav.bookings')}
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-2 py-2 text-red-500 hover:text-red-600"
                                >
                                    <LogOut size={18} />
                                    {t('nav.logout')}
                                </button>
                            </div>
                            <Link
                                href="/book"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-emerald-700 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('nav.book_now')}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-gray-800 font-medium py-2 hover:text-emerald-600"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href="/register"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-emerald-700 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('nav.register')}
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
