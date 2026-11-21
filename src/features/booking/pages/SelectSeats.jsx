
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Armchair, ArrowLeft, ArrowRight, BusFront, Check } from "lucide-react";
import { useTripSeats } from "../hooks/useTripSeats";
import { useTripSearchStore } from "../../../stores/useTripSearchStore";
import { useToast } from "../../../components/ui/toast/useToast";
import BookingSummary from "../components/BookingSummary";

export default function SelectSeats() {
    const location = useLocation();
    const trip = location.state?.trip;

    const { tripId } = useParams();
    const navigate = useNavigate();

    const [selectedSeats, setSelectedSeats] = useState([]);

    const travelers = useTripSearchStore(
        (state) => state.appliedFilters?.travelers ?? 1
    );


    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useTripSeats(tripId);

    const occupiedSeats = data?.occupiedSeats ?? [];
    const { showToast } = useToast();
    useEffect(() => {
        setSelectedSeats([]);
    }, [tripId, travelers]);

    if (isLoading) {
        return (
            <div className="p-10 text-center text-lg font-semibold text-[var(--text)]">
                جاري تحميل المقاعد...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="p-10 text-center">
                <p className="mb-4 text-base text-red-500">
                    حدث خطأ أثناء تحميل المقاعد.
                </p>

                <button
                    type="button"
                    onClick={() => refetch()}
                    className="rounded-lg bg-[var(--primary)] px-6 py-3 text-base font-bold text-white hover:opacity-90 "
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    const handleSeatClick = (seatNumber) => {
        if (occupiedSeats.includes(seatNumber)) return;

        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats((prev) =>
                prev.filter((seat) => seat !== seatNumber)
            );
            return;
        }

        if (selectedSeats.length >= travelers) {
            showToast(
                "error",
                `عدد المقاعد المسموح به هو ${travelers} حسب عدد المسافرين`
            );
            return;
        }

        setSelectedSeats((prev) => [...prev, seatNumber]);
    };

    const getSeatStyle = (seatNumber) => {
        const occupied = occupiedSeats.includes(seatNumber);
        const selected = selectedSeats.includes(seatNumber);

        if (occupied) {
            return "border-slate-500/60 bg-slate-500/20 text-slate-500 cursor-not-allowed";
        }

        if (selected) {
            return "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(10,169,155,0.25)]";
        }

        return "border-[var(--border)] bg-transparent text-[var(--text)] hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]";
    };

    const sortedSeats = [...selectedSeats].sort((a, b) => a - b);

    const handleContinue = () => {
        if (selectedSeats.length !== travelers) {
            showToast(
                "error",
                `يجب اختيار ${travelers} مقاعد لمتابعة الحجز`
            );
            return;
        }

        navigate(`/booking/${tripId}/passengers`, {
            state: {
                selectedSeats: sortedSeats,
                trip,
            },
        });
    };

    const totalRows = Math.ceil(data.totalSeats / 4);

    return (
        <section
            dir="rtl"
            className="containr mx-auto w-full max-w-7xl px-4 py-7 md:px-6"
        >
            <div
                dir="ltr"
                className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">

                <BookingSummary
                    trip={trip}
                    travelers={travelers}
                    data={data}
                    occupiedSeats={occupiedSeats}
                    selectedSeats={selectedSeats}
                />

                {/* Seat Selection Main Card - Right */}
                <div
                    dir="rtl"
                    className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)] md:p-6"
                >
                    {/* Card Header */}
                    <div className="mb-6">
                        <h2 className="flex items-center gap-3 text-xl font-extrabold text-[var(--text)]">
                            <Armchair
                                size={25}
                                className="text-[var(--primary)]"
                            />

                            اختر مقاعدك المفضلة
                        </h2>

                        <p className="mt-2 text-base text-[var(--muted)]">
                            اختر {travelers} مقعد حسب عدد المسافرين
                        </p>
                    </div>

                    {/* Bus and Selected Seats */}
                    <div
                        dir="ltr"
                        className="grid grid-cols-1 items-start gap-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]"
                    >
                        {/* Selected Seats Card - Left */}
                        <div
                            dir="rtl"
                            className="order-2 rounded-xl border border-[var(--border)] p-5 sm:order-1"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--soft-teal)] text-[var(--primary)]">
                                <Armchair size={25} />
                            </div>

                            <h3 className="mb-3 text-lg font-extrabold text-[var(--text)]">
                                مقاعدك المختارة
                            </h3>

                            <p className="mb-5 text-sm leading-7 text-[var(--muted)]">
                                اختر المقاعد التي تناسبك من مخطط الباص الموجود بجانبك.
                            </p>

                            <div className="mb-4 flex items-center justify-between gap-2">
                                <span className="text-sm font-bold text-[var(--text)]">
                                    المقاعد المختارة
                                </span>

                                <span className="text-base font-extrabold text-[var(--primary)]">
                                    {selectedSeats.length} / {travelers}
                                </span>
                            </div>

                            <div className="mb-5 h-2 overflow-hidden rounded-full bg-[var(--surface-alt)]">
                                <div
                                    className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
                                    style={{
                                        width: `${Math.min(
                                            (selectedSeats.length / travelers) * 100,
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>

                            {sortedSeats.length === 0 ? (
                                <p className="text-sm text-[var(--muted)]">
                                    لم تختر أي مقعد حتى الآن
                                </p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {sortedSeats.map((seat) => (
                                        <button
                                            key={seat}
                                            onClick={() => handleSeatClick(seat)}
                                            className="flex items-center gap-2 rounded-lg bg-[var(--soft-teal)] px-3 py-2 text-sm font-bold text-[var(--primary)]"
                                        >
                                            {seat}
                                            <span>×</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6">
                                <span
                                    className={`inline-flex rounded-lg px-3 py-2 text-sm font-bold ${selectedSeats.length === travelers
                                        ? "bg-[var(--soft-teal)] text-[var(--primary)]"
                                        : "bg-[var(--surface-alt)] text-[var(--muted)]"
                                        }`}
                                >
                                    {selectedSeats.length === travelers
                                        ? "اكتمل اختيار المقاعد"
                                        : "بانتظار اختيار المقاعد"}
                                </span>
                            </div>
                        </div>

                        {/* Bus Layout - Right */}
                        <div
                            dir="rtl"
                            className="order-1 mx-auto w-full max-w-[420px] rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)] p-4 sm:order-2"
                        >
                            {/* Bus Front */}
                            <div className="mb-5 flex items-center justify-between border-b border-dashed border-[var(--border)] pb-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)]">
                                        <BusFront size={21} />
                                    </span>

                                    <span className="text-sm font-bold text-[var(--muted)]">
                                        مقدمة الباص
                                    </span>
                                </div>

                                <span className="text-sm text-[var(--muted)]">
                                    مقعد السائق
                                </span>
                            </div>

                            {/* Seats */}
                            <div className="space-y-3">
                                {Array.from(
                                    { length: totalRows },
                                    (_, rowIndex) => {
                                        const rowSeats = Array.from(
                                            {
                                                length: Math.min(
                                                    4,
                                                    data.totalSeats - rowIndex * 4
                                                ),
                                            },
                                            (_, seatIndex) =>
                                                rowIndex * 4 + seatIndex + 1
                                        );

                                        return (
                                            <div
                                                key={rowIndex}
                                                dir="ltr"
                                                className="grid grid-cols-[repeat(2,minmax(0,1fr))_20px_repeat(2,minmax(0,1fr))_25px] items-center gap-1"
                                            >
                                                {rowSeats.map(
                                                    (seatNumber, index) => {
                                                        const occupied =
                                                            occupiedSeats.includes(seatNumber);

                                                        const selected =
                                                            selectedSeats.includes(seatNumber);

                                                        return (
                                                            <div
                                                                key={seatNumber}
                                                                className="flex flex-col items-center gap-1"
                                                                style={{
                                                                    gridColumn:
                                                                        index < 2
                                                                            ? index + 1
                                                                            : index + 2,
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    disabled={occupied}
                                                                    onClick={() =>
                                                                        handleSeatClick(seatNumber)
                                                                    }
                                                                    aria-label={`المقعد ${seatNumber}`}
                                                                    aria-pressed={selected}
                                                                    className={`flex h-12 w-full min-w-0 items-center justify-center rounded-lg border transition-all duration-200 ${getSeatStyle(
                                                                        seatNumber
                                                                    )}`}
                                                                >
                                                                    {occupied ? (
                                                                        <Armchair
                                                                            size={22}
                                                                            strokeWidth={1.8}
                                                                        />
                                                                    ) : selected ? (
                                                                        <Check
                                                                            size={23}
                                                                            strokeWidth={2.8}
                                                                        />
                                                                    ) : (
                                                                        <Armchair
                                                                            size={22}
                                                                            strokeWidth={1.8}
                                                                        />
                                                                    )}
                                                                </button>

                                                                {/* Seat Number Outside the Chair */}
                                                                <span
                                                                    className={`text-sm font-extrabold ${occupied
                                                                        ? "text-slate-500"
                                                                        : selected
                                                                            ? "text-[var(--primary)]"
                                                                            : "text-[var(--text)]"
                                                                        }`}
                                                                >
                                                                    {seatNumber}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}

                                                <span
                                                    style={{
                                                        gridColumn: 6,
                                                    }}
                                                    className="text-center text-xs font-bold text-[var(--muted)]"
                                                >
                                                    {String(rowIndex + 1).padStart(2, "0")}
                                                </span>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {/* Seat Legend */}
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 border-t border-[var(--border)] pt-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 rounded-sm border border-[var(--border)]" />
                                    <span className="text-sm text-[var(--muted)]">
                                        متاح
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 rounded-sm bg-slate-500/40" />
                                    <span className="text-sm text-[var(--muted)]">
                                        محجوز
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 rounded-sm bg-[var(--primary)]" />
                                    <span className="text-sm text-[var(--muted)]">
                                        محدد
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
                        <button
                            type="button"
                            onClick={() => navigate("/trips")}
                            className="flex items-center gap-2 rounded-lg bg-[var(--surface-alt)] px-5 py-3 text-sm font-bold text-[var(--text)] transition hover:opacity-80"
                        >
                            <ArrowRight size={17} />
                            رجوع للرحلات
                        </button>

                        <button
                            type="button"
                            onClick={handleContinue}

                            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            متابعة الحجز
                            <ArrowLeft size={17} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
