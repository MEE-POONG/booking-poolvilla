import Layout from "@/components/Layout";
import Image from "next/image";
import { CheckCircle2, Users, Star, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    const features = [
        t('about.feature.pools'),
        t('about.feature.views'),
        t('about.feature.concierge'),
        t('about.feature.amenities'),
        t('about.feature.pets'),
        t('about.feature.local'),
    ];

    const stats = [
        { label: t('about.stats.happy_guests'), value: "5,000+", icon: Users },
        { label: t('about.stats.luxury_villas'), value: "20+", icon: Star },
        { label: t('about.stats.years'), value: "10", icon: Award },
    ];

    return (
        <Layout title={`${t('about.title')} - Khao Yai Pool Villas`}>
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
                <Image
                    src="/images/villa-1.png"
                    alt="Khao Yai Landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{t('about.title')}</h1>
                    <p className="text-lg md:text-xl text-emerald-50 font-light">{t('about.subtitle')}</p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/villa-1.png"
                                alt="Luxury Villa Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">{t('about.story_label')}</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2 mb-6">{t('about.story_title')}</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>{t('about.story_p1')}</p>
                                <p>{t('about.story_p2')}</p>
                                <p>{t('about.story_p3')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-emerald-900 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800 mb-4 text-emerald-300">
                                    <stat.icon size={32} />
                                </div>
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-emerald-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{t('about.why_choose')}</h2>
                        <p className="text-gray-600">{t('about.why_choose_desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="shrink-0 text-emerald-600 mt-1">
                                    <CheckCircle2 size={24} />
                                </div>
                                <p className="text-gray-800 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
