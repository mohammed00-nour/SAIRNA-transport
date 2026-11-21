
import { useCompanies } from "../features/trips/hooks/useCompanies";
import CompanyListCard from "../features/trips/components/CompanyListCard";
import { BusFront, Building2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
export default function TransportCompanies() {
    const {
        data: companiesData,
        isPending,
        isError,
        refetch,
    } = useCompanies();

    const companies = companiesData ?? [];

    return (
        <main
            dir="rtl"
            className=" min-h-screen w-full font-[var(--font)] text-[var(--text)]"
        >
            {/* Page Hero */}
            <section className="relative overflow-hidden bg-[var(--surface)]  py-6 md:py-12 border-b border-[var(--border)] ">
                <div className="containr max-w-7xl">

                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-xs text-[var(--muted)]">
                        
                        <Link to="/">
                            <span className="hover:text-[var(--primary)]">
                                الرئيسية
                            </span>
                        </Link>
                        <span>/</span>
                        <span className=" text-[var(--primary)]">
                            شركات النقل
                        </span>
                    </div>

                    {/* Hero Content */}
                    <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">

                        <div className="max-w-2xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
                                <BusFront size={15} />
                                شركاؤنا في رحلتك
                            </div>

                            <h1 className="mb-4 text-2xl font-black leading-relaxed text-[var(--text)] md:text-4xl">
                                شركات بتوصلك
                                <span className="text-[var(--primary)]">
                                    {" "}لوين ما بدك
                                </span>
                            </h1>

                            <p className="max-w-xl text-sm leading-8 text-[var(--muted)] md:text-base">
                                اكتشف شركات النقل المتاحة، وتعرّف على حالة كل شركة،
                                واختر الشركة المناسبة لرحلتك القادمة.
                            </p>
                        </div>

                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[var(--soft-teal)] text-[var(--primary)] md:h-32 md:w-32">
                            <Building2 size={55} strokeWidth={1.4} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Section */}
            <section className="containr w-full max-w-7xl py-10  md:py-14">

                {/* Section Heading */}
                <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-black text-[var(--text)]">
                            شركات النقل
                        </h2>

                        <p className="mt-2 text-xs text-[var(--muted)]">
                            تعرّف على الشركات واختر وجهتك القادمة.
                        </p>
                    </div>

                    {!isPending && !isError && (
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-2 text-xs font-bold text-[var(--primary)]">
                            <Building2 size={15} />
                            {companies.length} شركات
                        </div>
                    )}
                </div>

                {/* Loading */}
                {isPending && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                            >
                                <div className="mb-5 flex justify-between">
                                    <div className="h-16 w-16 rounded-xl bg-[var(--surface-alt)]" />
                                    <div className="h-7 w-28 rounded-full bg-[var(--surface-alt)]" />
                                </div>

                                <div className="mb-3 h-5 w-2/3 rounded bg-[var(--surface-alt)]" />
                                <div className="mb-2 h-3 w-full rounded bg-[var(--surface-alt)]" />
                                <div className="mb-5 h-3 w-3/4 rounded bg-[var(--surface-alt)]" />
                                <div className="h-11 w-full rounded-xl bg-[var(--surface-alt)]" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-12 text-center">
                        <p className="mb-4 text-sm font-bold text-red-500">
                            حدث خطأ أثناء تحميل شركات النقل.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                        >
                            <RefreshCw size={16} />
                            إعادة المحاولة
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!isPending && !isError && companies.length === 0 && (
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-14 text-center">
                        <BusFront
                            size={42}
                            className="mx-auto mb-4 text-[var(--muted)]"
                        />

                        <h3 className="mb-2 font-bold text-[var(--text)]">
                            لا توجد شركات نقل حالياً
                        </h3>

                        <p className="text-xs text-[var(--muted)]">
                            لم يتم العثور على شركات لعرضها في الوقت الحالي.
                        </p>
                    </div>
                )}

                {/* Companies Grid */}
                {!isPending && !isError && companies.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {companies.map((company) => (
                            <CompanyListCard
                                key={company.id}
                                company={company}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
