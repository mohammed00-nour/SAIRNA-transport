
import { CalendarDays, ArrowLeft, ChevronDown } from "lucide-react";
import { useTripSearchStore } from "../../../stores/useTripSearchStore";
import { useCities } from "../hooks/useCities";

export default function TripsHeader({ data , sortBy, setSortBy }) {

    const appliedFilters = useTripSearchStore(
        (state) => state.appliedFilters
    );
    const { data: citiesData } = useCities();

    const fromCity = citiesData?.find(
        (city) => String(city.id) === String(appliedFilters?.from)
    );

    const destinationCity = citiesData?.find(
        (city) => String(city.id) === String(appliedFilters?.destination)
    );

    return (
        <section dir="rtl" className="flex w-full items-center justify-between gap-5 mt-[40px] font-[var(--font)] max-md:flex-col max-md:items-stretch">
            <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[19px] font-black text-[var(--text)]">
                            {data?.length || 0} رحلات متاحة
                        </h2>
                        <div className="flex items-center gap-2 rounded-lg bg-[var(--soft-teal)] px-3 py-1.5 text-[11px] font-bold text-[var(--primary)]">
                            <span>{fromCity?.name || "__"}</span>
                            <ArrowLeft size={14} />
                            <span>{destinationCity?.name || "__"}</span>
                        </div>
                    </div>
                    <p className="flex items-center gap-2 text-[10px] text-[var(--muted)]">
                        <CalendarDays size={14} />
                        {appliedFilters?.date || "لم يتم تحديد تاريخ"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 max-md:justify-between">
                <p className="shrink-0 text-[10px] font-bold text-[var(--muted)]">
                    ترتيب حسب:
                </p>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        defaultValue="departure"
                        className="h-[43px] min-w-[150px] appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2 pl-10 pr-4 text-[11px] font-bold text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
                    >
                        <option value="departure">وقت الانطلاق</option>
                        <option value="price">أقل سعر</option>
                        <option value="duration">أقل مدة </option>
                    </select>
                    <ChevronDown size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                </div>
            </div>
        </section>
    );
}
