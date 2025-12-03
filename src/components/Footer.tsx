import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-emerald-950 text-emerald-50 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-white">
                            Khao Yai <span className="text-emerald-400">Villas</span>
                        </h3>
                        <p className="text-emerald-200/80 text-sm leading-relaxed">
                            Experience the ultimate luxury escape in the heart of nature.
                            Our private pool villas offer serenity, comfort, and unforgettable memories.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-emerald-200/80 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/villas" className="text-emerald-200/80 hover:text-white transition-colors">Our Villas</Link></li>
                            <li><Link href="/about" className="text-emerald-200/80 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-emerald-200/80 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-emerald-200/80">
                                <MapPin className="shrink-0 mt-1" size={18} />
                                <span>123 Moo 4, Thanarat Road,<br />Pak Chong, Khao Yai 30130</span>
                            </li>
                            <li className="flex items-center gap-3 text-emerald-200/80">
                                <Phone size={18} />
                                <span>+66 81 234 5678</span>
                            </li>
                            <li className="flex items-center gap-3 text-emerald-200/80">
                                <Mail size={18} />
                                <span>info@khaoyaivillas.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-emerald-900/50 p-2 rounded-full hover:bg-emerald-800 transition-colors text-white">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-emerald-900/50 p-2 rounded-full hover:bg-emerald-800 transition-colors text-white">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-emerald-900 pt-8 text-center text-sm text-emerald-400/60">
                    <p>&copy; {new Date().getFullYear()} Khao Yai Pool Villas. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
