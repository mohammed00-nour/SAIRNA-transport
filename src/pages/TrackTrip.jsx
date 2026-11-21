
import { useParams, Link } from "react-router-dom";

import { useMyBookings } from "../../booking/hooks/useMyBookings";
import { useTripProgress } from "../hooks/useTripProgress";

import TrackingMap from "../components/TrackingMap";
import TrackingInfo from "../components/TrackingInfo";
import TripProgress from "../components/TripProgress";
import LiveIndicator from "../components/LiveIndicator";

function TrackTrip() {
    const { bookingId } = useParams();

    const {
        data: bookings = [],
        isLoading,
        isError,
    } = useMyBookings();

    const booking = bookings.find(
        (item) => item.id === Number(bookingId)
    );

    const trip = booking?.trip;

    const {
        progress,
        status,
        remainingTime,
    } = useTripProgress(
        trip?.departureAt,
        trip?.arrivalAt
    );

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                جاري تحميل بيانات الرحلة...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] items-center justify-center text-red-600">
                حدث خطأ أثناء تحميل بيانات الرحلة.
            </div>
        );
    }

    if (!booking || !trip) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-bold text-slate-800">
                    الحجز غير موجود
                </h2>

                <Link
                    to="/my-bookings"
                    className="rounded-xl bg-teal-600 px-5 py-3 text-white transition hover:bg-teal-700"
                >
                    العودة إلى حجوزاتي
                </Link>
            </div>
        );
    }

    return (
        <main
            dir="rtl"
            className="containr min-h-screen bg-slate-50 py-12"
        >
            <div className="max-w-6xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className=" space-y-1">
                        <h1 className="text-2xl font-bold text-slate-800">
                            تتبع رحلتك
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            تابع تقدم رحلتك وموقع الباص على الخريطة
                        </p>
                    </div>

                    <LiveIndicator status={status} />
                </div>

                <TrackingMap
                    trip={trip}
                    progress={progress}
                />

                <TripProgress
                    origin={trip.origin.name}
                    destination={trip.destination.name}
                    progress={progress}
                    status={status}
                    remainingTime={remainingTime}
                />

                <TrackingInfo booking={booking} />
            </div>
        </main>
    );
}

export default TrackTrip;
