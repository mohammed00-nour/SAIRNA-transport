
import { Building2, BusFront, CalendarDays, Clock3 } from "lucide-react";

const formatDate = (date) =>
    new Date(date).toLocaleDateString("ar-SY", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const formatTime = (date) =>
    new Date(date).toLocaleTimeString("ar-SY", {
        hour: "2-digit",
        minute: "2-digit",
    });

function TrackingInfo({ booking }) {
    const { trip } = booking;

    return (
        <div
            className="rounded-2xl border p-5"
            style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <h3
                className="mb-5 font-bold"
                style={{ color: "var(--text)" }}
            >
                تفاصيل الرحلة
            </h3>

            <div className="mb-5 flex items-center gap-3">
                <img
                    src={trip.company.logoUrl}
                    alt={trip.company.name}
                    className="h-12 w-12 rounded-xl border object-contain p-1"
                    style={{ borderColor: "var(--border)" }}
                />

                <div>
                    <p
                        className="font-bold"
                        style={{ color: "var(--text)" }}
                    >
                        {trip.company.name}
                    </p>

                    <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--muted)" }}
                    >
                        رقم الحجز: {booking.code}
                    </p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3">
                    <CalendarDays
                        style={{ color: "var(--primary)" }}
                        size={20}
                    />

                    <div>
                        <p
                            className="text-xs"
                            style={{ color: "var(--muted)" }}
                        >
                            تاريخ الرحلة
                        </p>

                        <p
                            className="mt-1 text-sm font-semibold"
                            style={{ color: "var(--text)" }}
                        >
                            {formatDate(trip.departureAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Clock3
                        style={{ color: "var(--primary)" }}
                        size={20}
                    />

                    <div>
                        <p
                            className="text-xs"
                            style={{ color: "var(--muted)" }}
                        >
                            موعد الانطلاق
                        </p>

                        <p
                            className="mt-1 text-sm font-semibold"
                            style={{ color: "var(--text)" }}
                        >
                            {formatTime(trip.departureAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <BusFront
                        style={{ color: "var(--primary)" }}
                        size={20}
                    />

                    <div>
                        <p
                            className="text-xs"
                            style={{ color: "var(--muted)" }}
                        >
                            عدد المقاعد
                        </p>

                        <p
                            className="mt-1 text-sm font-semibold"
                            style={{ color: "var(--text)" }}
                        >
                            {booking.seats?.length ?? 0}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Building2
                        style={{ color: "var(--primary)" }}
                        size={20}
                    />

                    <div>
                        <p
                            className="text-xs"
                            style={{ color: "var(--muted)" }}
                        >
                            موعد الوصول
                        </p>

                        <p
                            className="mt-1 text-sm font-semibold"
                            style={{ color: "var(--text)" }}
                        >
                            {formatTime(trip.arrivalAt)}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TrackingInfo;
