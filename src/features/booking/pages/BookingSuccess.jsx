
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Check,
    Ticket,
    Sparkles,
    Route,
} from "lucide-react";

export default function BookingSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state?.booking;

    // إذا المستخدم فتح الصفحة مباشرة بدون بيانات الحجز
    useEffect(() => {
        if (!booking) {
            navigate("/trips", { replace: true });
        }
    }, [booking, navigate]);

    if (!booking) return null;

    const trip = booking.trip ?? {};
    const seats = booking.seats ?? [];

    // اسم أول مسافر
    const passengerName = seats[0]?.passengerName || "المسافر";

    // معلومات المدن
    const origin =
        trip.origin?.name ||
        trip.origin?.city ||
        trip.originName ||
        "غير محدد";

    const destination =
        trip.destination?.name ||
        trip.destination?.city ||
        trip.destinationName ||
        "غير محدد";

    // تاريخ الرحلة
    const departureDate =
        trip.departureTime ||
        trip.departureAt ||
        trip.date;

    const formattedDate = departureDate
        ? new Date(departureDate).toLocaleString("ar-SY", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Damascus",
          })
        : "غير محدد";

    // تنسيق السعر
    const formattedPrice = Number(
        booking.totalPrice || 0
    ).toLocaleString("ar-SY");

    return (
        <main
            dir="rtl"
            className="min-h-[70vh] w-full px-4 py-12 md:py-16"
        >
            <div className="mx-auto flex w-full max-w-2xl justify-center">

                {/* Success Card */}
                <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-9 text-center shadow-sm sm:px-8 md:py-10">

                    {/* Success Icon */}
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check size={34} strokeWidth={2.5} />
                    </div>

                    {/* Ready Badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
                        <Sparkles size={14} />
                        تم الحجز بنجاح
                    </div>

                    {/* Title */}
                    <h1 className="mb-3 text-xl font-extrabold text-[var(--text)] sm:text-2xl">
                        يا سلام {passengerName}!
                        <span className="text-[var(--primary)]">
                            {" "}تم تأكيد حجزك.
                        </span>
                    </h1>

                    <p className="mx-auto mb-7 max-w-lg text-sm leading-7 text-[var(--muted)]">
                        أُضيفت تفاصيل الحجز إلى حسابك في
                        "حجوزاتي"، يمكنك مراجعتها ومتابعة تفاصيل رحلتك.
                    </p>

                    {/* Booking Information */}
                    <div className="grid grid-cols-1 gap-5 rounded-xl border border-dashed border-[var(--muted)]/60 p-5 sm:grid-cols-3 sm:divide-x sm:divide-x-reverse sm:divide-[var(--border)]">

                        {/* Booking Code */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-[var(--muted)]">
                                رقم الحجز
                            </span>

                            <span className="text-sm font-extrabold text-[var(--text)]">
                                {booking.code || "—"}
                            </span>
                        </div>

                        {/* Route */}
                        <div className="flex flex-col items-center gap-2 sm:px-3">
                            <span className="text-xs text-[var(--muted)]">
                                الوجهة
                            </span>

                            <span className="text-sm font-extrabold text-[var(--text)]">
                                {origin} - {destination}
                            </span>
                        </div>

                        {/* Departure */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-[var(--muted)]">
                                موعد الرحلة
                            </span>

                            <span className="text-sm font-extrabold text-[var(--text)]">
                                {formattedDate}
                            </span>
                        </div>
                    </div>

                    {/* Additional Booking Details */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--muted)]">
                        <span>
                            عدد المقاعد:{" "}
                            <strong className="text-[var(--text)]">
                                {seats.length}
                            </strong>
                        </span>

                        <span>
                            المبلغ الإجمالي:{" "}
                            <strong className="text-[var(--text)]">
                                {formattedPrice}
                            </strong>
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                        {/* Go To My Bookings */}
                        <button
                            type="button"
                            onClick={() => navigate("/my-bookings")}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                        >
                            <Ticket size={18} />
                            عرض التذكرة
                        </button>

                        {/* Track Trip */}
                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/track/${booking.tripId}`)
                            }
                            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-bold text-[var(--text)] transition hover:bg-[var(--surface-alt)]"
                        >
                            <Route size={18} />
                            تتبع الرحلة
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
