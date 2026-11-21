import { useNavigate } from "react-router-dom";
import { BusFront, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export default function CompanyListCard({ company }) {
    const navigate = useNavigate();

    const isActive = company.isActive;

    const handleViewTrips = () => {
        if (!isActive) return;

        navigate(`/trips?companyId=${company.id}`);
    };

    return (
        <article
            dir="rtl"
            className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]"
        >
            {/* Company Header */}
            <div className="mb-5 flex items-start justify-between gap-3">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-2">
                    {company.logoUrl ? (
                        <img
                            src={company.logoUrl}
                            alt={`شعار ${company.name}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    ) : (
                        <BusFront
                            size={30}
                            className="text-[var(--primary)]"
                        />
                    )}
                </div>

                {/* Company Status */}
                <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${
                        isActive
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-red-500/10 text-red-500"
                    }`}
                >
                    {isActive ? (
                        <CheckCircle2 size={13} />
                    ) : (
                        <XCircle size={13} />
                    )}

                    {isActive ? "الشركة تعمل حالياً" : "الشركة غير نشطة"}
                </div>
            </div>

            {/* Company Name */}
            <div className="mb-5 flex-1">
                <h3 className="mb-2 line-clamp-2 text-base font-black text-[var(--text)] transition-colors group-hover:text-[var(--primary)]">
                    {company.name}
                </h3>

                <p className="text-xs leading-6 text-[var(--muted)]">
                    {isActive
                        ? "يمكنك استعراض الرحلات المتاحة لهذه الشركة واختيار الرحلة المناسبة لك."
                        : "هذه الشركة غير متاحة للحجز في الوقت الحالي."}
                </p>
            </div>

            {/* Company Footer */}
            <div className="border-t border-[var(--border)] pt-4">
                <button
                    type="button"
                    onClick={handleViewTrips}
                    disabled={!isActive}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    عرض رحلات الشركة
                    <ArrowLeft size={17} />
                </button>
            </div>
        </article>
    );
}