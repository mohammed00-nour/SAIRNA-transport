
import { useParams, Link } from "react-router-dom";
import { useCallback, useState } from "react";

import { useMyBookings } from "../../booking/hooks/useMyBookings";
import { useTripProgress } from "../hooks/useTripProgress";

import TrackingMap from "../components/TrackingMap";
import TrackingInfo from "../components/TrackingInfo";
import TripProgress from "../components/TripProgress";
import LiveIndicator from "../components/LiveIndicator";

function TrackTrip() {
    const { bookingId } = useParams();

    const [distanceKm, setDistanceKm] = useState(null);

    const handleDistanceChange = useCallback((distance) => {
        setDistanceKm(distance);
    }, []);

    const {
        data: bookings = [],
        isLoading,
        isError,
    } = useMyBookings();

    // استبعاد الحجوزات الملغاة والرحلات ذات التواريخ غير الصالحة
    const now = Date.now();

    const validBookings = bookings.filter((booking) => {
        const trip = booking.trip;

        if (!trip || booking.cancelledAt || booking.status === "CANCELLED") {
            return false;
        }

        const departureTime = new Date(trip.departureAt).getTime();
        const arrivalTime = new Date(trip.arrivalAt).getTime();

        return (
            Number.isFinite(departureTime) &&
            Number.isFinite(arrivalTime) &&
            arrivalTime > departureTime
        );
    });

    // إذا وصلنا bookingId نعرض الحجز المطلوب تحديداً
    const selectedBooking = bookingId
        ? bookings.find((item) => item.id === Number(bookingId))
        : (() => {
              // أولاً: البحث عن رحلة جارية
              const currentTrip = validBookings
                  .filter((booking) => {
                      const departureTime = new Date(
                          booking.trip.departureAt
                      ).getTime();

                      const arrivalTime = new Date(
                          booking.trip.arrivalAt
                      ).getTime();

                      return departureTime <= now && now < arrivalTime;
                  })
                  .sort(
                      (a, b) =>
                          new Date(a.trip.arrivalAt).getTime() -
                          new Date(b.trip.arrivalAt).getTime()
                  )[0];

              if (currentTrip) return currentTrip;

              // إذا ما في رحلة جارية، نختار أقرب رحلة قادمة
              return validBookings
                  .filter(
                      (booking) =>
                          new Date(booking.trip.departureAt).getTime() > now
                  )
                  .sort(
                      (a, b) =>
                          new Date(a.trip.departureAt).getTime() -
                          new Date(b.trip.departureAt).getTime()
                  )[0];
          })();

    const trip = selectedBooking?.trip;

    const isCancelled =
        selectedBooking?.cancelledAt ||
        selectedBooking?.status === "CANCELLED";

    const { progress, status, remainingTime } = useTripProgress(
        trip?.departureAt,
        trip?.arrivalAt
    );

    if (isLoading) {
        return (
            <div
                className="flex min-h-[400px] items-center justify-center"
                style={{ color: "var(--muted)" }}
            >
                جاري تحميل بيانات الرحلة...
            </div>
        );
    }

    if (isError) {
        return (
            <div
                className="flex min-h-[400px] items-center justify-center"
                style={{ color: "var(--muted)" }}
            >
                حدث خطأ أثناء تحميل بيانات الرحلة.
            </div>
        );
    }

    // في حالة الدخول برقم حجز غير موجود
    if (bookingId && !selectedBooking) {
        return (
            <div
                dir="rtl"
                className="flex min-h-[400px] flex-col items-center justify-center gap-4"
                style={{ color: "var(--text)" }}
            >
                <h2 className="text-xl font-bold">
                    الحجز غير موجود
                </h2>

                <Link
                    to="/my-bookings"
                    className="rounded-xl px-5 py-3 font-semibold text-white"
                    style={{ backgroundColor: "var(--primary)" }}
                >
                    العودة إلى حجوزاتي
                </Link>
            </div>
        );
    }

    // الحجز المحدد ملغى أو لا توجد رحلة قابلة للتتبع
    if (!selectedBooking || !trip || isCancelled) {
        return (
            <div
                dir="rtl"
                className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-4 text-center"
                style={{ color: "var(--text)" }}
            >
                <h2 className="text-xl font-bold">
                    لا توجد رحلة متاحة للتتبع حالياً
                </h2>

                <p
                    className="max-w-md text-sm"
                    style={{ color: "var(--muted)" }}
                >
                    {bookingId
                        ? "هذا الحجز ملغى أو لا يمكن تتبع رحلته."
                        : "لا يوجد لديك رحلة جارية أو قادمة حالياً."}
                </p>

                <Link
                    to="/my-bookings"
                    className="rounded-xl px-5 py-3 font-semibold text-white"
                    style={{ backgroundColor: "var(--primary)" }}
                >
                    عرض حجوزاتي
                </Link>
            </div>
        );
    }

    return (
        <main
            dir="rtl"
            className="px-4 py-8 sm:px-6 lg:px-8"
            style={{
                backgroundColor: "var(--bg)",
                color: "var(--text)",
            }}
        >
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        تتبع رحلتك
                    </h1>

                    <p
                        className="mt-2 text-sm"
                        style={{ color: "var(--muted)" }}
                    >
                        تابع تقدم رحلتك وموقع الباص على الخريطة
                    </p>
                </div>

                <div
                    className="
                        grid grid-cols-1 gap-5
                        lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)]
                        items-start
                    "
                >
                    {/* لوحة الرحلة */}
                    <section
                        className="min-w-0 space-y-5 rounded-2xl border p-5"
                        style={{
                            backgroundColor: "var(--surface)",
                            borderColor: "var(--border)",
                            boxShadow: "var(--shadow)",
                        }}
                    >
                        <LiveIndicator status={status} />

                        <TripProgress
                            origin={trip.origin.name}
                            destination={trip.destination.name}
                            progress={progress}
                            status={status}
                            remainingTime={remainingTime}
                            distanceKm={distanceKm}
                        />

                        <div
                            className="border-t pt-5"
                            style={{ borderColor: "var(--border)" }}
                        >
                            <TrackingInfo booking={selectedBooking} />
                        </div>
                    </section>

                    {/* الخريطة */}
                    <section className="min-w-0">
                        <TrackingMap
                            trip={trip}
                            progress={progress}
                            onDistanceChange={handleDistanceChange}
                        />
                    </section>
                </div>
            </div>
        </main>
    );
}

export default TrackTrip;
