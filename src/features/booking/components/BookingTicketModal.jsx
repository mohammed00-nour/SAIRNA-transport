import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    Ticket,
    X,
    Copy,
    Check,
} from "lucide-react";

function BookingTicketModal({
    booking,
    onClose,
    formatDate,
    formatTime,
    formatPrice,
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        // منع تمرير الصفحة أثناء فتح التذكرة
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(booking.code);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            console.error("تعذر نسخ رقم الحجز");
        }
    };

    const trip = booking.trip;

    return createPortal(
        <div
            onClick={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#061923]/80 backdrop-blur-md p-4"
        >
            <div
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="تذكرة الحجز"
                className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#122f3e] shadow-2xl"
            >
                {/* Modal Header */}
                <div className="relative flex items-center justify-between bg-gradient-to-l from-teal-600 to-teal-800 px-5 py-6">
                    <div className="flex items-center gap-2 text-white">
                        <Ticket size={22} />

                        <span className="font-extrabold">
                            تذكرتك مع سيرنا
                        </span>
                    </div>

                    <span className="text-white/50 text-xs font-bold">
                        SAIRNA
                    </span>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="إغلاق التذكرة"
                        className="absolute top-3 left-3 rounded-lg bg-slate-950/30 p-1.5 text-white hover:bg-slate-950/50"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Ticket Body */}
                <div className="p-6">
                    {/* Booking Number */}
                    <div className="flex items-center justify-between mb-7">
                        <p className="text-sm font-extrabold text-white">
                            {booking.code}
                        </p>

                        <span className="text-xs text-slate-400">
                            رقم الحجز
                        </span>
                    </div>

                    {/* Route */}
                    <div className="flex items-center justify-between mb-7">
                        <h3 className="text-xl font-extrabold text-white">
                            {trip.destination?.name}
                        </h3>

                        <span className="text-teal-500 text-2xl">
                            ←
                        </span>

                        <h3 className="text-xl font-extrabold text-white">
                            {trip.origin?.name}
                        </h3>
                    </div>

                    <div className="border-t border-dashed border-slate-600 pt-5 space-y-5">
                        {/* Company and Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 mb-2">
                                    شركة النقل
                                </p>

                                <p className="text-sm font-bold text-white">
                                    {trip.company?.name}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 mb-2">
                                    التاريخ
                                </p>

                                <p className="text-xs font-bold text-white">
                                    {formatDate(trip.departureAt)}
                                </p>
                            </div>
                        </div>

                        {/* Time and Seats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 mb-2">
                                    الموعد
                                </p>

                                <p className="text-sm font-bold text-white">
                                    {formatTime(trip.departureAt)}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 mb-2">
                                    المقاعد
                                </p>

                                <p className="text-sm font-bold text-white">
                                    {booking.seats
                                        ?.map((seat) => seat.seatNumber)
                                        .join(" ، ")}
                                </p>
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 mb-2">
                                الإجمالي
                            </p>

                            <p className="text-sm font-extrabold text-white">
                                {formatPrice(booking.totalPrice)}
                            </p>
                        </div>
                    </div>

                    {/* Copy Section */}
                    <div className="border-t border-dashed border-slate-600 mt-5 pt-5">
                        <p className="text-[10px] text-slate-400 text-center mb-4">
                            تذكرة إلكترونية — يرجى إظهارها للسائق أو موظف النقل
                        </p>

                        <button
                            type="button"
                            onClick={handleCopy}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-600 py-3 text-sm font-bold text-white hover:bg-slate-700/40 transition-all"
                        >
                            {copied ? (
                                <>
                                    <Check
                                        size={17}
                                        className="text-teal-400"
                                    />
                                    تم نسخ رقم الحجز
                                </>
                            ) : (
                                <>
                                    <Copy size={17} />
                                    نسخ رقم الحجز
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default BookingTicketModal;