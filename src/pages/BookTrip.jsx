import { Link } from "react-router-dom";
import { BusFront, Bus } from "lucide-react";
import SearchForm from "../features/trips/components/SearchForm";
import CompanyCards from "../features/trips/components/CompanyCards";
import TripsHeader from "../features/trips/components/TripsHeader";
import TripFilters from "../features/trips/components/TripFilters";
import { useTrips } from "../features/trips/hooks/useTrip.js";
import { useTripSearchStore } from "../stores/useTripSearchStore"
import useTripFilters from "../features/trips/hooks/useTripFilters";
import TripCard from "../features/trips/components/TripCard";
import { useState } from "react";

function getDamascusHour(dateString) {


    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Damascus",
        hour: "2-digit",
        hourCycle: "h23",
    }).formatToParts(new Date(dateString));

    const hour = parts.find((part) => part.type === "hour");

    return Number(hour.value);
}

export default function BookTrip() {

    const [sortBy, setSortBy] = useState("departure");

    const { filters } = useTripFilters();

    const appliedFilters = useTripSearchStore(
        (state) => state.appliedFilters
    );
    const { data, isPending, isError } = useTrips();

    const filteredTrips = data?.filter((trip) => {
        // فلترة الشركة
        const matchesCompany =

            filters.companyId === "" ||
            String(trip.companyId) === filters.companyId;

        // استخراج ساعة المغادرة بتوقيت سوريا
        const hour = getDamascusHour(trip.departureAt);

        // فلترة وقت المغادرة
        const matchesTime =
            filters.departureTime === "" ||
            (filters.departureTime === "morning" && hour < 12) ||
            (filters.departureTime === "afternoon" && hour >= 12 && hour < 17) ||
            (filters.departureTime === "evening" && hour >= 17);

        // التأكد أن الرحلة لم تغادر بعد
        // const matchesFuture =
        //     new Date(trip.departureAt).getTime() >= Date.now();

        return matchesCompany && matchesTime ;
        // return matchesCompany && matchesTime && matchesFuture;
    });

    const sortedTrips = [...(filteredTrips || [])].sort((a, b) => {
        switch (sortBy) {
            case "price":
                return a.price - b.price;

            case "duration": {
                const durationA =
                    new Date(a.arrivalAt) - new Date(a.departureAt);

                const durationB =
                    new Date(b.arrivalAt) - new Date(b.departureAt);

                return durationA - durationB;
            }

            case "departure":
                return (
                    new Date(a.departureAt) -
                    new Date(b.departureAt)
                );

            default:
                return 0;
        }
    });

    return (
        <main className="min-h-screen">
            <section className=" relative">
                <div className="bg-gradient-to-l from-[var(--surface)] to-[var(--surface-alt)] ">
                    <div className="containr py-6 md:py-12">
                        <nav className="mb-8 flex items-center gap-2 text-[12px]">
                            <Link to="/" className="text-[var(--muted)] transition-colors hover:text-[var(--primary)]">
                                الرئيسية
                            </Link>
                            <span className="text-[var(--muted)]">/</span>
                            <span className="font-semibold text-[var(--primary)]">نتائج البحث</span>
                        </nav>
                        <div className="mb-5 text-right">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[11px] font-bold text-[var(--primary)]">
                                <BusFront size={14} />
                                احجز رحلتك بسهولة
                            </div>
                            <h1 className="text-2xl font-extrabold text-[var(--text)] md:text-4xl">
                                اختار الرحلة <span className="text-[var(--primary)]">اللي بتشبهك.</span>
                            </h1>
                            <p className="mt-2 text-[12px] text-[var(--muted)]">
                                قارن بين الشركات والأوقات، واحجز مقعدك بكل سهولة.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-[20px] top-[20px] md:left-[50px] md:top-[50px] z-30 text-[var(--primary)]/90 rotate-[-10deg]  ">
                        <Bus
                            width={70}
                            height={70}
                            strokeWidth={1.85}
                            className="sairna-icon"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <hr className="border-[var(--border)] absolute w-full" />
                <div className="containr">
                    <div className="mb-12 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-[18px] shadow-[var(--shadow-md)] relative transition-all duration-300 hover:shadow-[var(--shadow-lg)] top-[-20px]">
                        <SearchForm />
                    </div>
                    <CompanyCards data={data} />
                    <TripsHeader data={filteredTrips} sortBy={sortBy} setSortBy={setSortBy} />
                    <div className="my-8 grid grid-cols-[240px_minmax(0,1fr)] gap-5 max-md:grid-cols-1">
                        <aside className="max-md:row-start-1">
                            <TripFilters data={data} />
                        </aside>
                        <div className="max-md:row-start-2">
                            {!appliedFilters ? (
                                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
                                    أدخل تفاصيل رحلتك واضغط على بحث لعرض الرحلات المتاحة.
                                </div>
                            ) : isPending ? (
                                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
                                    جاري تحميل الرحلات...
                                </div>
                            ) : isError ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
                                    حدث خطأ أثناء تحميل الرحلات، حاول مرة أخرى.
                                </div>
                            ) : !filteredTrips || filteredTrips.length === 0 ? (
                                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">لا توجد رحلات متوفرة.</div>
                            ) : (
                                <div>
                                    {sortedTrips.map((trip) => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}