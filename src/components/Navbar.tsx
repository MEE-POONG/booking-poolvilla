import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, User, LogOut } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Villas", href: "/villas" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
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

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className={clsx("text-sm font-medium", isScrolled ? "text-gray-800" : "text-gray-900")}>
                                Hi, {user?.name}
                            </span>
                            <Link
                                href="/bookings"
                                className={clsx("text-sm font-medium transition-colors hover:text-emerald-600", isScrolled ? "text-gray-800" : "text-gray-900")}
                            >
                                My Bookings
                            </Link>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                            <Link
                                href="/book"
                                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                <Calendar size={16} />
                                Book Now
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
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                Register
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

                    {isAuthenticated ? (
                        <>
                            <div className="py-2 border-t border-gray-100">
                                <p className="text-gray-500 text-sm mb-2">Signed in as {user?.name}</p>
                                <Link
                                    href="/bookings"
                                    className="block text-gray-800 font-medium py-2 hover:text-emerald-600"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Bookings
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-red-500 font-medium flex items-center gap-2 py-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                            <Link
                                href="/book"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-emerald-700 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Book Now
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-gray-800 font-medium py-2 hover:text-emerald-600"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-emerald-700 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
