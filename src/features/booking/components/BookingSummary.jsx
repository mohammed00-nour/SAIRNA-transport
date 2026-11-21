
import {
    BusFront,
} from "lucide-react";

function formatTime(dateString) {
    if (!dateString) return "--:--";

    return new Intl.DateTimeFormat("ar-SY", {
        timeZone: "Asia/Damascus",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(new Date(dateString));
}

function formatDate(dateString) {
    if (!dateString) return "غير محدد";

    return new Intl.DateTimeFormat("ar-SY", {
        timeZone: "Asia/Damascus",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(dateString));
}

function formatPrice(price) {
    if (price == null) return "غير محدد";

    return `${Number(price).toLocaleString("en-US")} ل.س`;
}

export default function BookingSummary({
    trip,
    travelers,
    data,
    occupiedSeats = [],
    selectedSeats = [],
}) {
    const sortedSeats = [...selectedSeats].sort((a, b) => a - b);

    const totalPrice =
        trip?.price != null ? trip.price * travelers : null;

    return (
        <aside
            dir="rtl"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)]"
        >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
                <h2 className="text-xl font-extrabold text-[var(--text)]">
                    ملخص الحجز
                </h2>

                <BusFront
                    size={23}
                    className="text-[var(--primary)]"
                />
            </div>

            {/* Company */}
            <div className="mb-5 flex items-center gap-3">
                {trip?.company?.logoUrl ? (
                    <img
                        src={trip.company.logoUrl}
                        alt={trip.company.name || "شركة النقل"}
                        className="h-12 w-12 rounded-xl border border-[var(--border)] bg-white object-contain p-1"
                    />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                        <BusFront size={25} />
                    </div>
                )}

                <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-[var(--text)]">
                        {trip?.company?.name || "شركة النقل"}
                    </h3>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        رحلة مباشرة
                    </p>
                </div>
            </div>

            {/* Departure and Arrival */}
            <div className="mb-4 rounded-xl bg-[var(--surface-alt)] p-4">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[var(--muted)]">
                        الانطلاق
                    </span>

                    <span className="text-base font-extrabold text-[var(--text)]">
                        {trip?.origin?.name || "غير محدد"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--muted)]">
                        وقت المغادرة
                    </span>

                    <span className="text-lg font-extrabold text-[var(--primary)]">
                        {formatTime(trip?.departureAt)}
                    </span>
                </div>

                <div className="my-3 border-t border-dashed border-[var(--border)]" />

                <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[var(--muted)]">
                        الوصول
                    </span>

                    <span className="text-base font-extrabold text-[var(--text)]">
                        {trip?.destination?.name || "غير محدد"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--muted)]">
                        وقت الوصول
                    </span>

                    <span className="text-lg font-extrabold text-[var(--primary)]">
                        {formatTime(trip?.arrivalAt)}
                    </span>
                </div>
            </div>

            {/* Trip Date */}
            <div className="mb-4">
                <p className="mb-2 text-sm text-[var(--muted)]">
                    تاريخ الرحلة
                </p>

                <p className="text-base font-bold text-[var(--text)]">
                    {formatDate(trip?.departureAt)}
                </p>
            </div>

            {/* Trip Information */}
            <div className="border-t border-[var(--border)] pt-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted)]">
                        رقم الرحلة
                    </span>

                    <span className="text-base font-bold text-[var(--text)]">
                        {trip?.code || data?.tripId}
                    </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted)]">
                        عدد المسافرين
                    </span>

                    <span className="text-base font-bold text-[var(--text)]">
                        {travelers}
                    </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted)]">
                        إجمالي المقاعد
                    </span>

                    <span className="text-base font-bold text-[var(--text)]">
                        {data?.totalSeats ?? "--"}
                    </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted)]">
                        المقاعد المتاحة
                    </span>

                    <span className="text-base font-bold text-[var(--text)]">
                        {data?.availableSeats ?? "--"}
                    </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted)]">
                        المقاعد المحجوزة
                    </span>

                    <span className="text-base font-bold text-[var(--text)]">
                        {occupiedSeats.length}
                    </span>
                </div>
            </div>

            {/* Selected Seats */}
            <div className="my-4 border-t border-dashed border-[var(--border)]" />

            <div className="mb-5">
                <p className="mb-3 text-base font-bold text-[var(--text)]">
                    المقاعد المختارة
                </p>

                {sortedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {sortedSeats.map((seat) => (
                            <span
                                key={seat}
                                className="rounded-lg bg-[var(--soft-teal)] px-3 py-2 text-base font-extrabold text-[var(--primary)]"
                            >
                                {seat}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-[var(--muted)]">
                        لم يتم اختيار المقاعد بعد
                    </p>
                )}
            </div>

            {/* Prices */}
            <div className="rounded-xl bg-[var(--surface-alt)] p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-[var(--muted)]">
                        السعر للمسافر
                    </span>

                    <span className="text-base font-bold text-[var(--text)]">
                        {formatPrice(trip?.price)}
                    </span>
                </div>

                <div className="border-t border-dashed border-[var(--border)] pt-3">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[var(--text)]">
                            السعر الإجمالي
                        </span>

                        <span className="text-lg font-extrabold text-[var(--primary)]">
                            {formatPrice(totalPrice)}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
