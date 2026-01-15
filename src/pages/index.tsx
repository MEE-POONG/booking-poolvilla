import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import VillaCard from "@/components/VillaCard";
import Link from "next/link";
import { ArrowRight, Star, Shield, Heart } from "lucide-react";

import { villas } from "@/data/villas";
import { useLanguage } from "@/context/LanguageContext";

const FEATURED_VILLAS = villas;

export default function Home() {
  const { t } = useLanguage();
  return (
    <Layout>
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">{t('features.quality.title')}</h3>
              <p className="text-gray-600">{t('features.quality.desc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">{t('features.secure.title')}</h3>
              <p className="text-gray-600">{t('features.secure.desc')}</p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">{t('features.experience.title')}</h3>
              <p className="text-gray-600">{t('features.experience.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm">{t('home.luxury_label')}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">{t('home.featured_title')}</h2>
            </div>
            <Link href="/villas" className="group flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              {t('home.view_all')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_VILLAS.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-emerald-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
