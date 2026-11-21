
import useMe from '../features/auth/hooks/useMe'
import { useMyBookings } from '../features/booking/hooks/useMyBookings'
import Button from "../components/ui/Button";
import { useToast } from "../components/ui/toast/useToast";
import { useEffect } from 'react';
import { Sparkles, Hand, Ticket, LogOut, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../stores/authStore';
import { useQueryClient } from "@tanstack/react-query";

export default function Profile() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isPending, isError } = useMe();

    const {
        data: bookings,
        isPending: isBookingsPending,
        isError: isBookingsError,
    } = useMyBookings();

    const { showToast } = useToast();

    const clearAccessToken = useAuthStore(
        (state) => state.clearAccessToken
    );

    const bookingsCount = bookings?.length ?? 0;

    useEffect(() => {
        if (isError) {
            showToast("error", "حدث خطأ أثناء تحميل بياناتك، حاول مرة أخرى");
        }
    }, [isError, showToast]);

    useEffect(() => {
        if (isBookingsError) {
            showToast("error", "تعذر تحميل عدد حجوزاتك");
        }
    }, [isBookingsError, showToast]);

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-[var(--bg)] text-sm font-bold text-[var(--muted)]">
                جاري تحميل بياناتك...
            </div>
        );
    }

    if (isError || !user) {
        return null;
    }

    function logout() {
        clearAccessToken();
        queryClient.clear();

        showToast("success", "تم تسجيل الخروج بنجاح");

        navigate("/login", { replace: true });
    }

    return (
        <section
            dir="rtl"
            className="min-h-screen w-full overflow-hidden bg-[var(--bg)] font-[var(--font)] text-[var(--text)]"
        >
            {/* Profile Header */}
            <div className="relative overflow-hidden border-b border-[var(--dark)] bg-gradient-to-l from-[var(--dark-deep)] to-[var(--dark)] px-[max(6%,24px)] py-10">
                <span className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-dashed border-[var(--primary)] opacity-20" />

                <span className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full border border-dashed border-[var(--primary)] opacity-10" />

                <span className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/20 px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                    <Sparkles size={12} />
                    ملفك الشخصي
                </span>

                <h1 className="relative z-10 mt-3 text-[34px] font-black leading-tight text-white max-sm:text-2xl">
                    <Hand
                        className="ml-2 inline-block text-[var(--primary)]"
                        size={25}
                    />
                    {user.name}
                </h1>

                <p className="relative z-10 mt-3 text-xs text-white/70">
                    كل التفاصيل المتعلقة بحسابك
                </p>
            </div>

            {/* Profile Content */}
            <div className="mx-auto grid w-[92%] max-w-[1148px] grid-cols-[270px_minmax(0,1fr)] gap-[18px] py-[78px] max-md:grid-cols-1 max-md:py-10">

                {/* User Card */}
                <div className="flex flex-col items-center rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-6 py-7 shadow-[var(--shadow)]">
                    <span className="grid h-[81px] w-[81px] place-items-center rounded-[27px] bg-[var(--soft-teal)] text-[34px] font-black text-[var(--primary)]">
                        {user.name?.charAt(0)}
                    </span>

                    <span className="mt-3 w-full text-center text-base font-black text-[var(--text)]">
                        {user.name}
                    </span>

                    <span
                        dir="ltr"
                        className="mt-1 w-full text-center text-[11px] text-[var(--muted)]"
                    >
                        {user.email}
                    </span>

                    <p className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--surface-alt)] py-3 text-[11px] font-bold text-[var(--text)]">
                        <Ticket size={16} className="text-[var(--primary)]" />

                        {isBookingsPending
                            ? "جاري تحميل الحجوزات..."
                            : isBookingsError
                                ? "تعذر تحميل الحجوزات"
                                : `${bookingsCount} ${bookingsCount === 1 ? "حجز محفوظ" : "حجوزات محفوظة"}`}
                    </p>

                    <Button
                        onClick={logout}
                        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--dark)] transition hover:border-[var(--primary)] hover:bg-[var(--soft-teal)]"
                    >
                        <LogOut size={15} />
                        تسجيل الخروج
                    </Button>
                </div>

                {/* Account Information */}
                <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 shadow-[var(--shadow)]">
                    <span className="mb-4 block text-base font-black text-[var(--text)]">
                        معلومات الحساب
                    </span>

                    {/* Full Name */}
                    <div className="flex flex-row items-center justify-between border-t border-[var(--border)] py-4 text-xs">
                        <span className="text-[var(--muted)]">
                            الاسم الكامل
                        </span>

                        <span className="font-bold text-[var(--text)]">
                            {user.name}
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex flex-row items-center justify-between border-t border-[var(--border)] py-4 text-xs">
                        <span className="text-[var(--muted)]">
                            البريد الإلكتروني
                        </span>

                        <span
                            dir="ltr"
                            className="font-bold text-[var(--text)]"
                        >
                            {user.email}
                        </span>
                    </div>

                    {/* Account Type */}
                    <div className="flex flex-row items-center justify-between border-y border-[var(--border)] py-4 text-xs">
                        <span className="text-[var(--muted)]">
                            نوع الحساب
                        </span>

                        <span className="font-bold text-[var(--text)]">
                            {user.role === "USER"
                                ? "مستخدم"
                                : user.role || "غير محدد"}
                        </span>
                    </div>

                    <Link
                        to="/my-bookings"
                        className="mt-6 flex h-11 items-center justify-center gap-3 rounded-xl bg-[var(--primary)] px-5 text-xs font-bold text-white shadow-[var(--shadow)] transition hover:bg-[var(--primary-deep)]"
                    >
                        <ArrowLeft size={17} />
                        انتقل لحجوزاتي
                    </Link>
                </div>
            </div>
        </section>
    );
}
