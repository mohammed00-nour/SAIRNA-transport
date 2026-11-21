
import { Filter, ShieldCheck } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useCompanies } from "../hooks/useCompanies";
import useTripFilters from "../hooks/useTripFilters";

export default function TripFilters({ data = [] }) {
    const { data: companies = [] } = useCompanies();

    const times = [
        { id: 1, name: "كل الأوقات", value: "" },
        { id: 2, name: "صباحاً (قبل 12)", value: "morning" },
        { id: 3, name: "ظهراً (12-17)", value: "afternoon" },
        { id: 4, name: "مساءً (بعد 17)", value: "evening" },
    ];

    const availableTrips = data.filter((trip) => {
        const isFuture =
            new Date(trip.departureAt).getTime() >= Date.now();

        const hasAvailableSeats = trip.availableSeats > 0;

        return (
            trip.status === "AVAILABLE" &&
            isFuture &&
            hasAvailableSeats
        );
    });

    const { filters, updateFilter, resetFilters } = useTripFilters();

    function handleReset() {
        resetFilters();
    }

    return (
        <section dir="rtl" className="w-full md:w-[240px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 font-[var(--font)] shadow-[var(--shadow)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2">
                    <Filter size={17} className="text-[var(--muted)]" />
                    <h3 className="text-sm font-black text-[var(--text)]">
                        تصفية النتائج
                    </h3>
                </div>
                <Button variant="reSet" type='button' onClick={handleReset}>
                    <span className="text-xs font-bold text-[var(--primary)]">
                        إعادة ضبط
                    </span>
                </Button>
            </div>

            <div className="py-5">
                <h4 className="mb-4 text-xs font-black text-[var(--text)]">
                    شركة النقل
                </h4>
                <div className="flex flex-col gap-3">
                    <label key="0" className="flex cursor-pointer items-center justify-between gap-3 text-[14px] text-[var(--muted)] transition hover:text-[var(--primary)]">
                        <span className="flex items-center gap-2">
                            <input type="radio" name="company" value={0} checked={filters.companyId === ""}
                                onChange={() => updateFilter("companyId", "")}
                                className="h-3.5 w-3.5 cursor-pointer accent-[var(--primary)]" />
                            {"كل الشركات"}
                        </span>
                        <span className="min-w-5 rounded-md bg-[var(--surface-alt)] px-1.5 py-0.5 text-center text-[12px] font-bold text-[var(--muted)]">
                            {availableTrips.length}
                        </span>
                    </label>
                    {companies.map((company) => (
                        <label key={company.id} className="flex cursor-pointer items-center justify-between gap-3 text-[14px] text-[var(--muted)] transition hover:text-[var(--primary)]">
                            <span className="flex items-center gap-2">
                                <input type="radio" name="company" value={company.id} checked={filters.companyId === String(company.id)}
                                    onChange={() => updateFilter("companyId", company.id === 0 ? "" : company.id)}
                                    className="h-3.5 w-3.5 cursor-pointer accent-[var(--primary)]" />
                                {company.name}
                            </span>
                            <span className="min-w-5 rounded-md bg-[var(--surface-alt)] px-1.5 py-0.5 text-center text-[12px] font-bold text-[var(--muted)]">
                                {availableTrips.filter((trip) =>  String( trip.companyId )=== String(company.id)).length}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="py-5">
                <h4 className="mb-4 text-xs font-black text-[var(--text)]">
                    وقت الانطلاق
                </h4>
                <div className="flex flex-col gap-3">
                    {times.map((time) => (
                        <label key={time.id} className="flex cursor-pointer items-center gap-2 text-[14px] text-[var(--muted)] transition hover:text-[var(--primary)]">
                            <input type="radio" name="departureTime" value={time.id} checked={filters.departureTime === time.value}
                                onChange={() => updateFilter("departureTime", time.value)} className="h-3.5 w-3.5 cursor-pointer accent-[var(--primary)]" />
                            {time.name}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 rounded-xl bg-[var(--soft-teal)] p-4">
                <ShieldCheck size={21} className="shrink-0 text-[var(--primary)]" />
                <div>
                    <h4 className="text-[11px] font-black text-[var(--text)]">
                        الحجز بشكل واضح
                    </h4>
                    <p className="mt-1 text-[10px] leading-5 text-[var(--muted)]">
                        كل تفاصيل الرحلة قدامك قبل التأكيد.
                    </p>
                </div>
            </div>
        </section>
    );
}
