import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

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
                            {t('footer.brand_desc')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t('footer.quick_links')}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-emerald-200/80 hover:text-white transition-colors">{t('nav.home')}</Link></li>
                            <li><Link href="/villas" className="text-emerald-200/80 hover:text-white transition-colors">{t('footer.our_villas')}</Link></li>
                            <li><Link href="/about" className="text-emerald-200/80 hover:text-white transition-colors">{t('nav.about')}</Link></li>
                            <li><Link href="/contact" className="text-emerald-200/80 hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t('footer.contact_us')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-emerald-200/80">
                                <MapPin className="shrink-0 mt-1" size={18} />
                                <span>{t('footer.address')}</span>
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
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t('footer.follow_us')}</h4>
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
                    <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
}
