
import Button from "../components/ui/Button";
import { Sparkles, Hand, Ticket, LogOut, ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <section
            dir="rtl"
            className="min-h-screen w-full overflow-hidden bg-[var(--bg)] font-[var(--font)] text-[var(--text)]"
        >
            <div className="relative overflow-hidden border-b border-[var(--dark)] bg-gradient-to-l from-[var(--dark-deep)] to-[var(--dark)] px-[max(6%,24px)] py-10">

                <span className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-dashed border-[var(--primary)] opacity-20"></span>

                <span className="absolute -left-16 -bottom-24 h-52 w-52 rounded-full border border-dashed border-[var(--primary)] opacity-10"></span>

                <span className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/20 px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                    <Sparkles size={12} />
                    ملفك الشخصي
                </span>

                <h1 className="relative z-10 mt-3 text-[34px] font-black leading-tight text-white max-sm:text-2xl">
                    <Hand className="ml-2 inline-block text-[var(--primary)]" size={25} />
                    أهلاً slman890
                </h1>

                <p className="relative z-10 mt-3 text-xs text-white/70">
                    هون كل التفاصيل المتعلقة بحسابك التجريبي
                </p>
            </div>

            <div className="mx-auto grid w-[92%] max-w-[1148px] grid-cols-[270px_minmax(0,1fr)] gap-[18px] py-[78px] max-md:grid-cols-1 max-md:py-10">

                <div className="flex flex-col items-center rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-6 py-7 shadow-[var(--shadow)]">

                    <span className="grid h-[81px] w-[81px] place-items-center rounded-[27px] bg-[var(--soft-teal)] text-[34px] font-black text-[var(--primary)]">
                        S
                    </span>

                    <span className="mt-3 text-base font-black text-[var(--dark-deep)]">
                        slman890
                    </span>

                    <span className="mt-1 text-[11px] text-[var(--muted)]" dir="ltr">
                        slman890@gmail.com
                    </span>

                    <p className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--surface-alt)] py-3 text-[11px] font-bold text-[var(--dark)]">
                        <Ticket size={16} className="text-[var(--primary)]" />
                        0 حجوزات محفوظة
                    </p>

                    <Button className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--dark)] transition hover:border-[var(--primary)] hover:bg-[var(--soft-teal)]">
                        <LogOut size={15} />
                        تسجيل الخروج
                    </Button>

                </div>

                <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 shadow-[var(--shadow)]">

                    <span className="mb-4 block text-base font-black text-[var(--dark-deep)]">
                        معلومات الحساب
                    </span>

                    <div className="flex min-h-[58px] items-center justify-between border-t border-[var(--border)] py-4 text-xs">
                        <span className="font-bold text-[var(--dark-deep)]" dir="ltr">
                            slman890
                        </span>
                        <span className="text-[var(--muted)]">
                            الاسم الكامل
                        </span>
                    </div>

                    <div className="flex min-h-[58px] items-center justify-between border-t border-[var(--border)] py-4 text-xs">
                        <span className="font-bold text-[var(--dark-deep)]" dir="ltr">
                            slman890@gmail.com
                        </span>
                        <span className="text-[var(--muted)]">
                            البريد الإلكتروني
                        </span>
                    </div>

                    <div className="flex min-h-[58px] items-center justify-between border-y border-[var(--border)] py-4 text-xs">
                        <span className="font-bold text-[var(--dark-deep)]">
                            حساب تجريبي
                        </span>
                        <span className="text-[var(--muted)]">
                            نوع الحساب
                        </span>
                    </div>

                    <Link className="mt-6 flex h-11 items-center justify-center gap-3 rounded-xl bg-[var(--primary)] px-5 text-xs font-bold text-white shadow-[var(--shadow)] transition hover:bg-[var(--primary-deep)]">
                        <ArrowLeft size={17} />
                        انتقل لحجوزاتي
                    </Link>

                </div>

            </div>
        </section>
    )
}
