
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
    Users,
    UserRound,
    Building2,
    CreditCard,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

import BookingSummary from "../components/BookingSummary";
import { useTripSeats } from "../hooks/useTripSeats";
import { useToast } from "../../../components/ui/toast/useToast";
import { useCreateBooking } from "../hooks/useCreateBooking";

export default function BookingReview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripId } = useParams();

    const {
        mutate: createBooking,
        isPending,
    } = useCreateBooking();

    const trip = location.state?.trip;
    const selectedSeats = location.state?.selectedSeats ?? [];
    const passengers = location.state?.passengers ?? [];

    const [paymentMethod, setPaymentMethod] = useState("office");

    const { data, isLoading, isError, refetch } = useTripSeats(tripId);
    const occupiedSeats = data?.occupiedSeats ?? [];

    const { showToast } = useToast();


    const handleConfirmBooking = () => {
        if (!trip || selectedSeats.length === 0 || passengers.length === 0) {
            showToast("error", "بيانات الحجز غير مكتملة، يرجى إعادة المحاولة");
            return;
        }

        if (paymentMethod === "online") {
            showToast("info", "الدفع الإلكتروني غير متاح حالياً");
            return;
        }

        const bookingData = {
            tripId: trip.id,
            seats: passengers.map((passenger) => ({
                seatNumber: passenger.seatNumber,
                passengerName: passenger.fullName,
                passengerPhone: passenger.phone,
            })),
        };

        createBooking(bookingData, {
            onSuccess: (response) => {
                navigate("/success", {
                    state: {
                        booking: response,
                    },
                });
            },

            onError: (error) => {
                console.log("Booking error:", error.response?.data);
                showToast(
                    "error",
                    error.response?.data?.message || "حدث خطأ أثناء إنشاء الحجز"
                );
            },
        });
    };

    if (isLoading) {
        return (
            <div className="p-10 text-center text-[var(--text)]">
                جاري تحميل بيانات المقاعد...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="p-10 text-center">
                <p className="mb-4 text-red-500">
                    حدث خطأ أثناء تحميل بيانات المقاعد.
                </p>
                <button
                    type="button"
                    onClick={() => refetch()}
                    className="rounded-lg bg-[var(--primary)] px-6 py-3 font-bold text-white"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    return (
        <main dir="rtl" className="containr mx-auto w-full max-w-7xl px-4 py-7 md:px-6">
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">

                {/* Review Content */}
                <div className=" min-w-0 space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

                    {/* Passengers */}
                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                        <div className="mb-5 flex items-center gap-3">
                            <Users size={20} className="text-[var(--primary)]" />
                            <h2 className="font-bold text-[var(--text)]">
                                تفاصيل المسافرين
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {passengers.map((passenger, index) => (
                                <div
                                    key={passenger.seatNumber}
                                    className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-teal)] text-[var(--primary)]">
                                            <UserRound size={19} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--text)]">
                                                {passenger.fullName}
                                            </h3>
                                            <p className="mt-1 text-xs text-[var(--muted)]">
                                                {passenger.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="rounded-lg bg-[var(--surface-alt)] px-3 py-2 text-xs font-bold text-[var(--primary)]">
                                        المقعد {passenger.seatNumber}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                        <h2 className="mb-5 font-bold text-[var(--text)]">
                            طريقة تأكيد الحجز
                        </h2>

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("office")}
                                className={`flex w-full items-center justify-between rounded-xl border p-4 text-right transition ${paymentMethod === "office"
                                    ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                                    : "border-[var(--border)] hover:bg-[var(--surface-alt)]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Building2 size={22} className="text-[var(--primary)]" />
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--text)]">
                                            الدفع في مكتب الشركة
                                        </h3>
                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            الدفع عند مراجعة المكتب لتأكيد الحجز
                                        </p>
                                    </div>
                                </div>

                                {paymentMethod === "office" && (
                                    <CheckCircle2 size={19} className="text-[var(--primary)]" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod("online")}
                                className={`flex w-full items-center justify-between rounded-xl border p-4 text-right transition ${paymentMethod === "online"
                                    ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                                    : "border-[var(--border)] hover:bg-[var(--surface-alt)]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <CreditCard size={22} className="text-[var(--primary)]" />
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--text)]">
                                            الدفع الإلكتروني (أونلاين)
                                        </h3>
                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            متابعة عملية الدفع إلكترونياً
                                        </p>
                                    </div>
                                </div>

                                {paymentMethod === "online" && (
                                    <CheckCircle2 size={19} className="text-[var(--primary)]" />
                                )}
                            </button>
                        </div>
                    </section>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/booking/${tripId}/passengers`, {
                                    state: {
                                        trip,
                                        selectedSeats,
                                        passengers,
                                    },
                                })
                            }
                            className="flex items-center gap-2 rounded-lg bg-[var(--surface-alt)] px-5 py-3 text-sm font-bold text-[var(--text)] transition hover:opacity-80"
                        >
                            <ArrowRight size={17} />
                            السابق
                        </button>

                        <button
                            type="button"
                            onClick={handleConfirmBooking}
                            disabled={isPending}
                            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--primary)]/10 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? "جاري تأكيد الحجز..." : "تأكيد الحجز"}
                            <ArrowLeft size={17} />
                        </button>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="w-full min-w-0">
                    <BookingSummary
                        trip={trip}
                        travelers={passengers.length}
                        selectedSeats={selectedSeats}
                        occupiedSeats={occupiedSeats}
                        data={data}
                    />
                </div>

            </div>
        </main>
    );
}
