
import {
    Armchair,
    Wallet,
    Ticket,
    Route,
    BusFront,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookingCard({
    booking,
    onShowTicket,
    formatTime,
    formatDate,
    formatPrice,
}) {
    const trip = booking.trip;
    const navigate = useNavigate();

    const now = new Date();
    const departureAt = new Date(trip.departureAt);
    const arrivalAt = new Date(trip.arrivalAt);

    const isCancelled =
        booking.status === "CANCELLED" || Boolean(booking.cancelledAt);

    const tripStatus = isCancelled
        ? {
              label: "الحجز ملغي",
              className: "bg-[var(--surface-alt)] text-[var(--muted)]",
          }
        : now >= arrivalAt
          ? {
                label: "وصلت",
                className:
                    "bg-[var(--soft-teal)] text-[var(--primary-deep)]",
            }
          : now < departureAt
            ? {
                  label: "لم تنطلق بعد",
                  className:
                      "bg-[var(--soft-teal)] text-[var(--primary)]",
              }
            : {
                  label: "الرحلة جارية",
                  className:
                      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              };

    return (
        <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">

            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-5">

                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--soft-teal)] p-2 text-[var(--primary)]">
                        <Ticket size={19} />
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-[var(--muted)]">
                            رقم الحجز
                        </p>

                        <p className="mt-1 text-sm font-bold text-[var(--text)]">
                            {booking.code}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                    {/* Booking Status */}
                    <span className="flex items-center gap-1.5 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[11px] font-bold text-[var(--primary-deep)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />

                        {booking.status === "CONFIRMED"
                            ? "تم تأكيد الحجز"
                            : booking.status}
                    </span>

                    {/* Trip Status */}
                    <span
                        className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${tripStatus.className}`}
                    >
                        {tripStatus.label}
                    </span>
                </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-1 items-center gap-8 px-6 py-8 md:grid-cols-[1fr_2fr]">

                {/* Company Details */}
                <div className="flex flex-col gap-3 text-right">

                    <div className="flex items-center gap-2">
                        <img
                            src={trip.company?.logoUrl}
                            alt={trip.company?.name || "شركة النقل"}
                            className="h-8 w-8 rounded-lg bg-white p-1 object-contain"
                        />

                        <span className="text-sm font-bold text-[var(--text)]">
                            {trip.company?.name}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Armchair size={15} />

                        <span>
                            المقاعد:{" "}
                            {booking.seats
                                ?.map((seat) => seat.seatNumber)
                                .join(" ، ")}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Wallet size={15} />

                        <span>{formatPrice(booking.totalPrice)}</span>
                    </div>
                </div>

                {/* Route Details */}
                <div className="flex items-center justify-between gap-4">

                    <div className="text-right">
                        <p className="mb-2 text-xs text-[var(--muted)]">
                            من
                        </p>

                        <h3 className="text-xl font-extrabold text-[var(--text)]">
                            {trip.origin?.name}
                        </h3>

                        <p className="mt-2 text-xs font-bold text-[var(--text)]">
                            {formatTime(trip.departureAt)}
                        </p>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                        <BusFront
                            size={17}
                            className="text-[var(--primary)]"
                        />

                        <div className="w-full border-t border-dashed border-[var(--border)]" />

                        <p className="text-center text-[10px] text-[var(--muted)]">
                            {formatDate(trip.departureAt)}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="mb-2 text-xs text-[var(--muted)]">
                            إلى
                        </p>

                        <h3 className="text-xl font-extrabold text-[var(--text)]">
                            {trip.destination?.name}
                        </h3>

                        <p className="mt-2 text-xs font-bold text-[var(--text)]">
                            {formatTime(trip.arrivalAt)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border)] px-5 py-4">

                <button
                    type="button"
                    onClick={() => navigate(`/track-trip/${booking.id}`)}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-2.5 text-xs font-bold text-[var(--primary)] transition-colors hover:bg-[var(--soft-teal)]"
                >
                    <Route size={15} />
                    تتبع الرحلة
                </button>

                <button
                    type="button"
                    onClick={() => onShowTicket(booking)}
                    className="flex items-center gap-2 rounded-xl bg-[var(--dark)] px-5 py-2.5 text-xs font-bold text-white transition-all hover:opacity-90"
                >
                    <Ticket size={15} />
                    عرض التذكرة
                </button>
            </div>
        </article>
    );
}

export default BookingCard;
