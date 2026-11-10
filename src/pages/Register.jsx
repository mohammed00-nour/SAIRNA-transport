import { Link } from "react-router-dom";

import { useRegister } from "../features/auth/hooks/useRegister";
import { useNavigate } from "react-router-dom";

import { Sparkles, User, Mail, Lock, Eye, ShieldCheck, Ticket, ArrowLeft, Info } from "lucide-react";

import { useToast } from '../components/ui/toast/useToast'

import { useState } from "react";

export default function Register() {

    const { showToast } = useToast();
    const navigate = useNavigate();
    const registerMutation = useRegister();

    function handleRegister(e) {
        e.preventDefault();
        registerMutation.mutate({
            name: formData.fullName,
            email: formData.email,
            password: formData.password
        }, {
            onSuccess: () => {
                showToast("success", "تم إنشاء حسابك الجديد")
                navigate("/");
            },
            onError: (error) => {
                const errorMessage = error?.response?.data?.message;

                const message = Array.isArray(errorMessage)
                    ? errorMessage[0] === "password must be longer than or equal to 8 characters"
                        ? "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل"
                        : "يرجى التأكد من صحة بيانات التسجيل"
                    : "حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى";

                showToast("error", message);
            }
        });
    }
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    return (
        <section
            dir="rtl"
            className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--bg)] px-5 py-10 font-[var(--font)] text-[var(--text)] transition-colors duration-300"
        >
            <div className="grid w-full max-w-[972px] grid-cols-2 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] max-md:max-w-[500px] max-md:grid-cols-1">
                <div className="flex flex-col justify-center bg-[var(--surface)] px-12 py-9 max-sm:px-6">
                    <div className="mb-7 flex flex-col items-start">
                        <span className="mb-3 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                            <Sparkles className="ml-1 inline" size={12} />
                            انضم لعائلة سيرنا
                        </span>
                        <h2 className="text-[23px] font-black text-[var(--text)]">
                            خلّينا نبدأ <span className="text-[var(--primary)]">المشوار سوا!</span>
                        </h2>
                        <p className="mt-2 text-[11px] text-[var(--muted)]">
                            حساب بسيط، وحجزاتك كلها بين إيديك.
                        </p>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                        <label
                            htmlFor="fullName"
                            className="text-[11px] font-bold text-[var(--text)]"
                        >
                            الاسم الكامل
                        </label>
                        <div className="flex h-11 items-center gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 transition focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">

                            <input
                                type="text" id="fullName" name="fullName" placeholder="اسمك الكامل" autoComplete="name"
                                className="w-full bg-transparent text-[11px] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                            <User
                                size={16}
                                className="shrink-0 text-[var(--muted)]"
                            />
                        </div>
                        <label
                            htmlFor="email"
                            className="text-[11px] font-bold text-[var(--text)]"
                        >
                            البريد الإلكتروني
                        </label>
                        <div className="flex h-11 items-center gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 transition focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">

                            <input
                                type="email" id="email" name="email" placeholder="name@example.com"
                                autoComplete="email"
                                className="w-full bg-transparent text-[11px] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Mail
                                size={16}
                                className="shrink-0 text-[var(--muted)]"
                            />
                        </div>
                        <label
                            htmlFor="password"
                            className="text-[11px] font-bold text-[var(--text)]">كلمة المرور</label>
                        <div className="flex h-11 items-center gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 transition focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
                            <input
                                type="password" id="password" name="password" placeholder="أكتب على الأقل 8 أحرف"
                                autoComplete="new-password"
                                className="w-full bg-transparent text-[11px] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <Eye
                                size={16}
                                className="shrink-0 cursor-pointer text-[var(--muted)]"
                            />
                            <Lock
                                size={16}
                                className="shrink-0 text-[var(--muted)]"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--muted)]">
                            <input
                                type="checkbox"
                                name="terms"
                                id="terms"
                                className="h-3 w-3 shrink-0 cursor-pointer accent-[var(--primary)]"
                            />
                            <label htmlFor="terms">
                                أوافق على استخدام بيانات التسجيل في هذا النموذج التجريبي.
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[var(--primary)] text-xs font-black text-white shadow-[var(--shadow)] transition hover:bg-[var(--primary-deep)]"
                            disabled={registerMutation.isPending}
                        >
                            <ArrowLeft size={16} />
                            {registerMutation.isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                        </button>
                    </form>
                    <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-[var(--muted)]">

                        <span>عندك حساب من قبل؟</span>
                        <Link
                            to="/login"
                            className="font-bold text-[var(--primary)] transition hover:text-[var(--primary-deep)]"
                        >
                            سجل دخولك
                        </Link>
                    </div>
                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-[var(--surface-alt)] px-3 py-3 text-[9px] leading-5 text-[var(--muted)]">
                        <Info
                            size={15}
                            className="shrink-0 text-[var(--primary)]"/>
                        بياناتك محمية، ونستخدمها فقط لإدارة حسابك وحجوزاتك عبر سيرنا.
                    </div>
                </div>
                <div className="relative flex flex-col overflow-hidden bg-gradient-to-br from-[var(--dark-deep)] via-[var(--dark)] to-[var(--primary-deep)] px-10 py-9 max-sm:px-6">

                    <span className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-dashed border-white/20"></span>

                    <span className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-dashed border-white/10"></span>

                    <span className="relative z-10 mb-7 flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[10px] font-bold text-white">
                        عالم جديد بانتظارك
                        <Sparkles size={14} />
                    </span>
                    <h2 className="relative z-10 text-[32px] font-black leading-[1.5] text-white max-sm:text-2xl">
                        كل الطرق
                        <br />
                        بتوصل لذكريات.
                    </h2>
                    <p className="relative z-10 mt-2 text-[10px] font-medium text-white/80">
                        وين ما تكون وجهتك، نحنا منكون معك.
                    </p>
                    <img
                        src="https://res.cloudinary.com/dv6aotwvd/image/upload/v1793965559/image_1_smcvub.jpg"
                        alt="المسجد الأموي في دمشق"
                        className="relative z-10 mt-8 h-[270px] w-full -rotate-[4deg] rounded-[15px] object-cover shadow-[var(--shadow-md)] max-sm:h-[210px]"
                    />
                    <div className="relative z-10 mt-10 flex items-center justify-between gap-3 text-[10px] font-bold text-white">
                        <p className="flex items-center gap-2">
                            <ShieldCheck size={15} />
                            سهولة وموثوقية
                        </p>
                        <p className="flex items-center gap-2">
                            <Ticket size={15} />
                            حجز بخطوات بسيطة
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
