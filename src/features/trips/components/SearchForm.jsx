
import Button from "../../../components/ui/Button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCities } from "../hooks/useCities";
import { useNavigate } from "react-router-dom";
import Toast from "../../../components/ui/toast/Toast";
import { useTripSearchStore } from "../../../stores/useTripSearchStore";

export default function SearchForm() {
    const applySearch = useTripSearchStore(
        (state) => state.applySearch
    );

    const searchParams = useTripSearchStore(
        (state) => state.searchParams
    );

    const setSearchParams = useTripSearchStore(
        (state) => state.setSearchParams
    );

    const [toastMessage, setToastMessage] = useState("");

    const { data: citiesData, isPending, isError } = useCities();
    const navigate = useNavigate();

    if (isPending) {
        return (
            <div
                dir="rtl"
                className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]"
            >
                جاري تحميل المدن...
            </div>
        );
    }

    if (isError || !citiesData) {
        return (
            <div className="text-center text-sm text-[var(--muted)]">
                حدث خطأ أثناء تحميل المدن، حاول مرة أخرى
            </div>
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (searchParams.from === searchParams.destination) {
            setToastMessage("مدينة الانطلاق والوصول لا يمكن أن تكونا نفس المدينة.");
            return;
        }

        if (
            searchParams.date &&
            searchParams.date < new Date().toISOString().split("T")[0]
        ) {
            setToastMessage("تاريخ الرحلة لا يمكن أن يكون في الماضي.");
            return;
        }

        applySearch();
        navigate("/trips");
    }

    return (
        <form
            dir="rtl"
            onSubmit={handleSubmit}
            className="grid grid-cols-[1.2fr_36px_1.2fr_1.2fr_1fr_1.4fr] items-center gap-2 p-2 max-lg:grid-cols-3 max-sm:grid-cols-1 text-[var(--muted)]"
        >
            {/* From */}
            <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                <label className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                    من وين؟
                </label>

                <select
                    required
                    value={searchParams.from}
                    onChange={(e) =>
                        setSearchParams({ from: e.target.value })
                    }
                    className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-[var(--muted)] outline-none"
                >
                    <option value="" className="bg- text-[var(--muted)]">
                        اختر المدينة
                    </option>

                    {citiesData.map((city) => (
                        <option
                            key={city.id}
                            value={city.id}
                            className="bg-white text-[var(--dark)]"
                        >
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Swap Cities */}
            <button
                type="button"
                onClick={() =>
                    setSearchParams({
                        from: searchParams.destination,
                        destination: searchParams.from
                    })
                }
                className="mx-auto grid h-8 w-8 cursor-pointer place-items-center rounded-lg bg-[var(--soft-teal)] text-lg font-bold text-[var(--primary)] transition-transform duration-500 hover:rotate-180"
            >
                ⇄
            </button>

            {/* Destination */}
            <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg text-[var(--muted)] border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                <label className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                    لوين؟
                </label>

                <select
                    required
                    value={searchParams.destination}
                    onChange={(e) =>
                        setSearchParams({ destination: e.target.value })
                    }
                    className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-[var(--muted)] outline-none"
                >
                    <option value="" className="bg-white text-[var(--muted)]">
                        اختر المدينة
                    </option>

                    {citiesData.map((city) => (
                        <option
                            key={city.id}
                            value={city.id}
                            className="bg-white text-[#263238]"
                        >
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date */}
            <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                <label className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                    تاريخ الرحلة
                </label>

                <input
                    type="date"
                    required
                    value={searchParams.date}
                    onChange={(e) =>
                        setSearchParams({ date: e.target.value })
                    }
                    className="w-full bg-transparent text-[14px] font-bold text-[var(--muted)] outline-none"
                />
            </div>

            {/* Travelers */}
            <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                <label className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                    المسافرين
                </label>

                <select
                    value={searchParams.travelers}
                    onChange={(e) =>
                        setSearchParams({
                            travelers: Number(e.target.value)
                        })
                    }
                    className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-[var(--muted)] outline-none"
                >
                    <option value="1" className="bg-white text-[#263238]">1 مسافر</option>
                    <option value="2" className="bg-white text-[#263238]">2 مسافرين</option>
                    <option value="3" className="bg-white text-[#263238]">3 مسافرين</option>
                    <option value="4" className="bg-white text-[#263238]">4 مسافرين</option>
                </select>
            </div>

            {/* Search Button */}
            <div>
                <Button className="h-[54px] w-full rounded-lg bg-[var(--primary)] text-[12px] font-bold text-white shadow-[0_7px_18px_rgba(10,169,155,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-deep)]">
                    <Search className="inline-block h-4 w-4" />
                    ابحث عن رحلتك
                </Button>
            </div>

            {/* Toast */}
            {toastMessage && (
                <Toast
                    type="error"
                    message={toastMessage}
                    onClose={() => setToastMessage("")}
                />
            )}
        </form>
    );
}
