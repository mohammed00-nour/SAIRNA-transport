
import { Link, useLocation } from "react-router-dom";
import {
    ChevronLeft,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function BookingStepper() {
    const { pathname } = useLocation();

    const steps = [
        {
            number: 1,
            title: "اختيار المقاعد",
            path: "seats",
        },
        {
            number: 2,
            title: "بيانات المسافرين",
            path: "passengers",
        },
        {
            number: 3,
            title: "المراجعة والتأكيد",
            path: "review",
        },
    ];

    const currentStep = pathname.includes("/passengers")
        ? 2
        : pathname.includes("/review")
            ? 3
            : 1;

    return (
        <section
            dir="rtl"
            className="containr w-full bg-[var(--background)] px-5 pt-6 pb-8"
        >
            <div className="mx-auto max-w-[1200px]">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
                    <Link
                        to="/"
                        className="transition hover:text-[var(--primary)]"
                    >
                        الرئيسية
                    </Link>

                    <ChevronLeft size={13} />

                    <Link
                        to="/trips"
                        className="transition hover:text-[var(--primary)]"
                    >
                        الرحلات
                    </Link>

                    <ChevronLeft size={13} />

                    <span className="text-[var(--text)]">
                        إتمام الحجز
                    </span>
                </nav>

                {/* Title and Change Trip */}
                <div className="mt-6 flex items-center justify-between gap-4">

                    <div>
                        <div className="mb-3 flex w-fit items-center gap-1.5 rounded-full bg-[var(--soft-teal)] px-3 py-1.5 text-[11px] font-bold text-[var(--primary)]">
                            <Sparkles size={12} />
                            باقي شوي وتوصل
                        </div>

                        <h1 className="text-2xl font-extrabold text-[var(--text)] sm:text-3xl">
                            كمّل حجز{" "}
                            <span className="text-[var(--primary)]">
                                رحلتك.
                            </span>
                        </h1>
                    </div>

                    <Link
                        to="/trips"
                        className="flex shrink-0 items-center gap-2 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--primary)] sm:text-sm"
                    >
                        <ArrowRight size={16} />
                        تغيير الرحلة
                    </Link>
                </div>


                {/* Booking Steps */}
                <div className="relative mt-8 w-full px-1">

                    {/* Connecting Line */}
                    <div className="absolute top-3.5 right-[16.66%] left-[16.66%] h-px bg-[var(--border)]" />

                    <div className="relative grid w-full grid-cols-3">

                        {steps.map((step) => {
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;

                            return (
                                <div
                                    key={step.number}
                                    className="flex min-w-0 flex-col items-center gap-2 text-center"
                                >
                                    <span
                                        className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-extrabold transition sm:h-8 sm:w-8 ${isActive
                                                ? "bg-[var(--primary)] text-white"
                                                : isCompleted
                                                    ? "bg-[var(--soft-teal)] text-[var(--primary)]"
                                                    : "bg-[var(--surface)] text-[var(--muted)]"
                                            }`}
                                    >
                                        {step.number}
                                    </span>

                                    <span
                                        className={`max-w-full text-[10px] font-bold leading-5 transition sm:text-xs ${isActive || isCompleted
                                                ? "text-[var(--primary)]"
                                                : "text-[var(--muted)]"
                                            }`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
