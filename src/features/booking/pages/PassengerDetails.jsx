
import { Users, UserRound, Phone, ArrowLeft, ArrowRight, Info } from "lucide-react";

import BookingSummary from "../components/BookingSummary";
import { useState, useEffect } from "react";
import useMe from "../../auth/hooks/useMe";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useTripSeats } from "../hooks/useTripSeats";
import { useToast } from "../../../components/ui/toast/useToast";

export default function PassengerDetails() {
    const location = useLocation();

    const trip = location.state?.trip;
    const selectedSeats = location.state?.selectedSeats ?? [];

    console.log("Trip:", trip);
    console.log("Selected Seats:", selectedSeats);

    const { data: user, isPending } = useMe();
    const [passengers, setPassengers] = useState(selectedSeats.map((seatNumber, index) => ({
        seatNumber,
        fullName: (index === 0) ? user?.name || "" : "",
        phone: (index === 0) ? user?.phone || "" : "",
    })));

    const { tripId } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError, refetch } = useTripSeats(tripId);

    const occupiedSeats = data?.occupiedSeats ?? [];
    useEffect(() => {
        if (isPending || !user) return;

        setPassengers((prev) => {
            if (prev.length === 0) return prev;

            return prev.map((passenger, index) => {
                if (index !== 0) return passenger;

                return {
                    ...passenger,
                    fullName: passenger.fullName || user.name || "",
                    phone: passenger.phone || user.phone || "",
                };
            });
        });
    }, [user, isPending]);

    const { showToast } = useToast();
    const validatePassengers = () => {
        for (let index = 0; index < passengers.length; index++) {
            const passenger = passengers[index];

            if (!passenger.fullName.trim()) {
                showToast(
                    "error",
                    `يرجى إدخال اسم المسافر ${index + 1}`
                );
                return false;
            }

            if (!passenger.phone.trim()) {
                showToast(
                    "error",
                    `يرجى إدخال رقم هاتف المسافر ${index + 1}`
                );
                return false;
            }
            if (!/^09\d{8}$/.test(passenger.phone.trim())) {
                showToast(
                    "error",
                    `رقم هاتف المسافر ${index + 1} غير صحيح`
                );
                return false;
            }
        }

        return true;
    };


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
    return (
        <section
            dir="rtl"
            className="containr mx-auto w-full max-w-7xl px-4 py-7 md:px-6"
        >
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">

                {/* Passenger Details - Right */}
                <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">

                    {/* Header */}
                    <div className="mb-5">
                        <div className="mb-2 flex items-center gap-3">
                            <Users
                                size={22}
                                className="text-[var(--primary)]"
                            />

                            <h2 className="text-xl font-extrabold text-[var(--text)]">
                                مين مسافر معنا؟
                            </h2>
                        </div>

                        <p className="text-sm text-[var(--muted)]">
                            دخل بيانات المسافرين حسب عدد المقاعد المختارة
                        </p>
                    </div>

                    {/* Passengers Cards */}
                    <div className="space-y-4">

                        {selectedSeats.map((seatNumber, index) => (
                            <div
                                key={seatNumber}
                                className="rounded-xl border border-[var(--border)] p-4 sm:p-5"
                            >

                                {/* Passenger Header */}
                                <div className="mb-5 flex items-center justify-between gap-3">

                                    <div className="flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--soft-teal)] text-xs font-bold text-[var(--primary)]">
                                            {index + 1}
                                        </span>

                                        <h3 className="text-sm font-extrabold text-[var(--text)]">
                                            المسافر {index + 1}
                                        </h3>
                                    </div>

                                    <span className="rounded-lg bg-[var(--surface-alt)] px-3 py-1.5 text-xs font-bold text-[var(--muted)]">
                                        مقعد رقم {seatNumber}
                                    </span>
                                </div>

                                {/* Inputs */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    {/* Full Name */}
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-[var(--text)]">
                                            الاسم الكامل
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="الاسم الكامل"
                                                className="w-full rounded-xl border border-[var(--border)] bg-transparent py-3 pe-4 ps-10 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                                value={passengers?.[index]?.fullName || ""}
                                                onChange={(e) =>
                                                    setPassengers((prev) => {
                                                        const updatedPassengers = [...prev];

                                                        updatedPassengers[index] = {
                                                            ...updatedPassengers[index],
                                                            fullName: e.target.value,
                                                        };

                                                        return updatedPassengers;
                                                    })
                                                }
                                            />

                                            <UserRound
                                                size={17}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-[var(--text)]">
                                            رقم الموبايل
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="tel"
                                                placeholder="09xxxxxxxx"
                                                className="w-full rounded-xl border border-[var(--border)] bg-transparent py-3 pe-4 ps-10 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                                value={passengers?.[index]?.phone || ""}
                                                onChange={(e) =>
                                                    setPassengers((prev) => {
                                                        const updatedPassengers = [...prev];

                                                        updatedPassengers[index] = {
                                                            ...updatedPassengers[index],
                                                            phone: e.target.value,
                                                        };

                                                        return updatedPassengers;
                                                    })
                                                }
                                            />

                                            <Phone
                                                size={17}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Information Message */}
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--soft-teal)] px-3 py-3 text-xs leading-6 text-[var(--primary)]">
                        <Info size={16} className="shrink-0" />

                        <p>
                            يرجى التأكد من صحة معلومات المسافرين قبل متابعة الحجز.
                        </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/booking/${tripId}/seats`, {
                                    state: {
                                        trip,
                                        selectedSeats,
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
                            onClick={() => {
                                if (!validatePassengers()) return;

                                navigate(`/booking/${tripId}/review`, {
                                    state: {
                                        trip,
                                        selectedSeats,
                                        passengers,
                                    },
                                });
                            }}
                            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--primary)]/10 transition hover:opacity-90"
                        >
                            متابعة الحجز
                            <ArrowLeft size={17} />
                        </button>

                    </div>

                </div>

                {/* Booking Summary - Left */}
                <div className="w-full min-w-0">
                    <BookingSummary trip={trip} travelers={passengers.length} selectedSeats={selectedSeats} occupiedSeats={occupiedSeats} data={data} />
                </div>

            </div>
        </section>
    );
}
