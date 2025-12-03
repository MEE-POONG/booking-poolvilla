import Layout from "@/components/Layout";
import BookingForm from "@/components/BookingForm";

export default function BookPage() {
    return (
        <Layout title="Book Your Stay - Khao Yai Pool Villas">
            <div className="bg-emerald-900 py-20 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Book Your Stay</h1>
                <p className="text-emerald-100 max-w-2xl mx-auto px-4">
                    Secure your luxury escape today. Fill out the form below and we'll get back to you with confirmation.
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <BookingForm />
                </div>
            </div>
        </Layout>
    );
}
