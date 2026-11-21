
import { Link } from "react-router-dom";
import {
    BusFront,
    Armchair,
    ArrowLeft,
} from "lucide-react";

// تحويل الوقت إلى توقيت دمشق
function formatTime(date) {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Damascus",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(new Date(date));
}

// حساب مدة الرحلة
function getDuration(departureAt, arrivalAt) {
    const diff =
        new Date(arrivalAt).getTime() -
        new Date(departureAt).getTime();

    if (diff < 0) return "—";

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} س ${remainingMinutes} د`;
}

// تنسيق السعر
function formatPrice(price) {
    return new Intl.NumberFormat("en-US").format(price);
}

export default function TripCard({ trip }) {
    const departureTime = formatTime(trip.departureAt);
    const arrivalTime = formatTime(trip.arrivalAt);

    const duration = getDuration(
        trip.departureAt,
        trip.arrivalAt
    );

    const isAvailable =
        trip.status === "AVAILABLE" &&
        trip.availableSeats > 0;

    return (
        <article
            dir="rtl"
            className="
                mb-3 overflow-hidden rounded-2xl
                border border-[var(--surface-alt)]
                bg-[var(--surface)]
                text-[var(--text)]
                transition-all duration-300
                hover:border-[var(--primary)]
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="flex items-center gap-3">
                    <div className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        overflow-hidden rounded-xl
                        bg-[var(--surface-alt)]
                    ">
                        {trip.company?.logoUrl ? (
                            <img
                                src={trip.company.logoUrl}
                                alt={trip.company.name}
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <BusFront
                                size={25}
                                className="text-[var(--primary)]"
                            />
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-extrabold">
                            {trip.company?.name}
                        </h3>

                        <p className="mt-1 text-[11px] opacity-60">
                            {trip.code}
                        </p>
                    </div>
                </div>

                <div className="
                    flex items-center gap-2
                    rounded-full border border-[var(--surface-alt)]
                    px-3 py-1.5 text-[10px]
                    opacity-80
                ">
                    <BusFront
                        size={14}
                        className="text-[var(--primary)]"
                    />
                    حافلة سياحية
                </div>
            </div>

            {/* Main Content */}
            <div className="
                grid grid-cols-1 items-center gap-5
                px-5 py-6
                md:grid-cols-[minmax(0,1fr)_162px]
            ">

                {/* Route */}
                <div className="
                    flex min-w-0 items-center
                    justify-between gap-3
                ">

                    {/* Departure */}
                    <div className="shrink-0 text-center">
                        <p className="text-xl font-extrabold sm:text-2xl">
                            {departureTime}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold opacity-60">
                            {trip.origin?.name}
                        </p>
                    </div>

                    {/* Route Line */}
                    <div className="
                        flex min-w-0 flex-1
                        flex-col items-center gap-1
                    ">
                        <span className="text-[10px] font-semibold opacity-60">
                            {duration}
                        </span>

                        <div className="flex w-full items-center gap-2">
                            <span className="
                                h-px flex-1
                                border-t border-dashed
                                border-[var(--text)] opacity-40
                            " />

                            <BusFront
                                size={17}
                                className="shrink-0 text-[var(--primary)]"
                            />

                            <span className="
                                h-px flex-1
                                border-t border-dashed
                                border-[var(--text)] opacity-40
                            " />
                        </div>

                        <span className="
                            text-[10px] font-bold
                            text-[var(--primary)]
                        ">
                            مباشرة
                        </span>
                    </div>

                    {/* Arrival */}
                    <div className="shrink-0 text-center">
                        <p className="text-xl font-extrabold sm:text-2xl">
                            {arrivalTime}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold opacity-60">
                            {trip.destination?.name}
                        </p>
                    </div>
                </div>

                {/* Price */}
                <div className="
                    flex flex-row items-center
                    justify-between gap-3
                    border-t border-[var(--surface-alt)]
                    pt-4
                    md:flex-col md:items-stretch
                    md:border-r md:border-t-0
                    md:pt-0 md:pr-5
                ">
                    <div>
                        <p className="text-[10px] opacity-60">
                            السعر للشخص
                        </p>

                        <p className="mt-1 text-lg font-extrabold">
                            {formatPrice(trip.price)} ل.س
                        </p>

                        <div className="
                            mt-2 flex items-center gap-1.5
                            text-[10px] font-semibold
                            text-[var(--primary)]
                        ">
                            <Armchair size={13} />
                            {trip.availableSeats} مقعد متاح
                        </div>
                    </div>

                    <Link
                        to={`/booking/${trip.id}/seats`}
                        state={{ trip }}
                        onClick={(e) => {
                            if (!isAvailable) {
                                e.preventDefault();
                            }
                        }}
                        aria-disabled={!isAvailable}
                        className={`
                            flex shrink-0 items-center
                            justify-center gap-2
                            rounded-xl px-4 py-3
                            text-[11px] font-bold
                            transition
                            ${
                                isAvailable
                                    ? "bg-[var(--primary)] text-white hover:opacity-90"
                                    : "cursor-not-allowed bg-[var(--surface-alt)] opacity-60"
                            }
                        `}
                    >
                        اختيار المقاعد
                        <ArrowLeft size={15} />
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="
                flex flex-wrap items-center
                justify-between gap-3
                border-t border-[var(--surface-alt)]
                px-5 py-3
            ">
                <div className="
                    flex items-center gap-2
                    text-[10px] opacity-60
                ">
                    <BusFront size={13} />
                    {trip.code}
                </div>

                <div className="flex items-center gap-2">
                    <span className="
                        flex items-center gap-1
                        rounded-md bg-[var(--surface-alt)]
                        px-2 py-1.5 text-[10px]
                    ">
                        <Armchair size={12} />
                        {trip.availableSeats} / {trip.totalSeats}
                    </span>

                    <span className="
                        rounded-md bg-[var(--surface-alt)]
                        px-2 py-1.5 text-[10px]
                    ">
                        {isAvailable ? "متاحة للحجز" : "غير متاحة"}
                    </span>
                </div>
            </div>
        </article>
    );
}
