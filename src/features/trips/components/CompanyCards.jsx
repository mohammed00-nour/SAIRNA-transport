
import { useCompanies } from "../hooks/useCompanies";
import { BusFront, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import useTripFilters from "../hooks/useTripFilters";

export default function CompanyCards() {
    const { data: companiesData, isPending, isError } = useCompanies();
    const { filters, updateFilter } = useTripFilters();

    const companyId = filters.companyId;

    function handleCompanySelect(companyId) {
        updateFilter(
            "companyId",
            companyId === 0 ? "" : String(companyId),
        );
    }

    if (isPending) {
        return (
            <div
                dir="rtl"
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]"
            >
                جاري تحميل شركات النقل...
            </div>
        );
    }

    if (isError) {
        return (
            <div
                dir="rtl"
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-red-500"
            >
                حدث خطأ أثناء تحميل بيانات شركات النقل.
            </div>
        );
    }

    return (
        <section
            dir="rtl"
            className="w-full font-[var(--font)] text-[var(--text)]"
        >
            {/* Section Header */}
            <div className="mb-5 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
                <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--soft-teal)] text-[10px] font-black text-[var(--primary)]">
                        01
                    </span>

                    <div>
                        <h3 className="text-base font-black text-[var(--text)]">
                            اختار شركة النقل
                        </h3>

                        <p className="mt-1 text-[10px] text-[var(--muted)]">
                            حدد الشركة اللي بتفضلها، واحجز رحلتك بمواعيدها المتاحة.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--muted)]">
                    <span>02</span>
                    <ArrowLeft size={13} />
                    اختر الوقت والمقعد
                </div>
            </div>

            {/* Companies */}
            <div className="grid grid-cols-5 gap-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">

                {/* All Companies */}
                <button
                    type="button"
                    className={`group flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${
                        companyId === ""
                            ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                            : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:bg-[var(--soft-teal)]"
                    }`}
                    onClick={() => handleCompanySelect(0)}
                >
                    <BusFront
                        size={20}
                        className="text-[var(--primary)]"
                    />

                    <h4 className={`text-[11px] font-black ${
                        companyId === ""
                            ? "text-[var(--primary)]"
                            : "text-[var(--muted)]"
                    }`}>
                        كل الشركات
                    </h4>

                    <p className="text-[9px] text-[var(--muted)]">
                        قارن الخيارات
                    </p>
                </button>

                {/* Company Cards */}
                {companiesData?.map((company) => {
                    const isAvailable = company.isActive;
                    const isSelected = companyId === String(company.id);

                    return (
                        <button
                            type="button"
                            key={company.id}
                            disabled={!isAvailable}
                            onClick={() => handleCompanySelect(company.id)}
                            className={`group flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center shadow-[var(--shadow)] transition-all duration-300 ${
                                !isAvailable
                                    ? "cursor-not-allowed border-[var(--border)] bg-[var(--surface-alt)] opacity-65"
                                    : isSelected
                                        ? "border-[var(--primary)] bg-[var(--soft-teal)]"
                                        : "border-[var(--border)] bg-[var(--surface)] hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:shadow-[var(--shadow-md)]"
                            }`}
                        >
                            {/* Company Logo */}
                            {company.logoUrl ? (
                                <img
                                    src={company.logoUrl}
                                    alt={company.name}
                                    className="h-7 w-7 rounded-lg bg-white object-contain p-1"
                                />
                            ) : (
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--soft-teal)] text-xs font-black text-[var(--primary)]">
                                    {company.name?.charAt(0)}
                                </span>
                            )}

                            {/* Company Name */}
                            <h4 className={`line-clamp-1 text-[11px] font-black transition-colors ${
                                isSelected
                                    ? "text-[var(--primary)]"
                                    : "text-[var(--text)]"
                            }`}>
                                {company.name}
                            </h4>

                            {/* Availability Status */}
                            <div className={`flex items-center gap-1 text-[9px] font-bold ${
                                isAvailable
                                    ? "text-[var(--primary)]"
                                    : "text-[var(--muted)]"
                            }`}>
                                {isAvailable ? (
                                    <>
                                        <CheckCircle2 size={11} />
                                        <span>متاحة للحجز</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={11} />
                                        <span>غير متاحة حالياً</span>
                                    </>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
