
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket } from "lucide-react";

import { useMyBookings } from "../features/booking/hooks/useMyBookings";
import BookingCard from "../features/booking/components/BookingCard";
import BookingTicketModal from "../features/booking/components/BookingTicketModal";

function MyBookings() {
    const navigate = useNavigate();

    const {
        data: bookings,
        isPending,
        isError,
        error,
    } = useMyBookings();

    const [selectedBooking, setSelectedBooking] = useState(null);

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Damascus",
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("ar-SY", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Damascus",
        });
    };

    const formatPrice = (price) => {
        return `${Number(price).toLocaleString("en-US")} ل.س`;
    };

    if (isPending) {
        return (
            <div className="py-20 text-center">
                جاري تحميل حجوزاتك...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-20 text-center text-red-500">
                {error?.response?.data?.message ||
                    "حدث خطأ أثناء جلب الحجوزات"}
            </div>
        );
    }

    return (
        <section className="min-h-screen">
            {/* Hero Section */}
            <div className="containr border-b border-[var(--border)] bg-gradient-to-l from-[var(--surface)] to-[var(--surface-alt)]">
                <div className="max-w-6xl py-6 md:py-12 text-right">

                    {/* Breadcrumb */}
                    <div className="flex justify-start items-center gap-3 text-[12px] mb-6">
                        <Link to="/">
                            <span className="text-[var(--muted)] hover:text-[var(--primary)] ">
                                الرئيسية
                            </span>
                        </Link>

                        <span className="text-[var(--muted)]">
                            /
                        </span>

                        <span className="text-[var(--primary)] ">
                            حجوزاتي
                        </span>
                    </div>

                    {/* Badge */}
                    <div className="flex justify-start mb-4">
                        <span className="rounded-full bg-teal-500/20 text-teal-500 px-4 py-1.5 text-xs">
                            ✨ كل رحلاتك بمكان واحد
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-right text-[var(--text)]">
                        تذاكرك{" "}
                        <span className="text-teal-500">
                            دايماً معك
                        </span>
                    </h1>

                    <p className="text-sm text-[var(--muted)] mt-3 text-right">
                        راقب حجوزاتك، وراجع تفاصيل رحلاتك السابقة والقادمة.
                    </p>
                </div>
            </div>

            {/* All Bookings */}
            <div className="containr max-w-6xl mx-auto py-16">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        type="button"
                        onClick={() => navigate("/trips")}
                        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all"
                    >
                        <span className="text-xl leading-none">+</span>
                        حجز جديد
                    </button>

                    <div className="text-right">
                        <h2 className="text-xl font-extrabold text-[var(--text)]">
                            جميع حجوزاتي
                        </h2>

                        <p className="text-xs text-[var(--muted)] mt-1">
                            كل رحلاتك المحجوزة، السابقة والقادمة
                        </p>
                    </div>
                </div>

                {/* Booking Cards */}
                {bookings?.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onShowTicket={setSelectedBooking}
                                formatTime={formatTime}
                                formatDate={formatDate}
                                formatPrice={formatPrice}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-14 text-center">
                        <Ticket
                            size={35}
                            className="mx-auto text-teal-500 mb-4"
                        />

                        <h3 className="text-[var(--text)] font-bold text-lg">
                            ما عندك حجوزات حالياً
                        </h3>

                        <p className="text-sm text-[var(--muted)] mt-2">
                            احجز رحلتك القادمة واستمتع برحلة مريحة.
                        </p>
                    </div>
                )}
            </div>

            {/* Ticket Modal */}
            {selectedBooking && (
                <BookingTicketModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    formatDate={formatDate}
                    formatTime={formatTime}
                    formatPrice={formatPrice}
                />
            )}
        </section>
    );
}

export default MyBookings;
