
import { Link } from "react-router-dom";
import { Sparkles, Mail, Lock, Eye, ShieldCheck, Ticket, ArrowLeft, Info } from "lucide-react";

import { useToast } from "../components/ui/toast/useToast";

import { useLogin } from "../features/auth/hooks/useLogin";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

export default function Login() {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const loginMutation = useLogin();

    function handleLogin(e) {
        e.preventDefault();
        loginMutation.mutate({
            email: formData.email,
            password: formData.password
        }, {
            onSuccess: () => {
                showToast("success", "تم تسجيل الدخول بنجاح");
                navigate('/');
            },
            onError: (error) => {
                const message =
                    error?.response?.data?.message === "INVALID_CREDENTIALS"
                        ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
                        : "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى";

                showToast("error", message);
            }
        });
    }
    return (
        <section
            dir="rtl"
            className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--bg)] px-5 py-10 font-[var(--font)] text-[var(--text)] transition-colors duration-300">
            <div className="grid w-full max-w-[972px] grid-cols-2 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] max-md:max-w-[500px] max-md:grid-cols-1">
                <div className="flex flex-col justify-center bg-[var(--surface)] px-12 py-10 max-sm:px-6">
                    <div className="mb-5 flex flex-col items-start">
                        <span className="mb-3 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                            <Sparkles className="ml-1 inline" size={12} />
                            أهلاً بعودتك
                        </span>
                        <h2 className="text-[23px] font-black text-[var(--text)]">
                            منوّر، <span className="text-[var(--primary)]">اشتقنالك!</span>
                        </h2>
                        <p className="mt-2 text-[11px] text-[var(--muted)]">
                            ادخل على حسابك وتابع حجوزاتك براحة.
                        </p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                        <label htmlFor="email" className="text-[11px] font-bold text-[var(--text)]">
                            البريد الإلكتروني
                        </label>
                        <div className="flex h-11 items-center gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 transition focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                className="w-full bg-transparent text-[11px] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                autoComplete="email"
                            />
                            <Mail size={16} className="shrink-0 text-[var(--muted)]" />
                        </div>
                        <label htmlFor="password" className="text-[11px] font-bold text-[var(--text)]">
                            كلمة المرور
                        </label>
                        <div className="flex h-11 items-center gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 transition focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
                            <input
                                type="password"
                                id="password"
                                placeholder="أكتب على الأقل 6 أحرف"
                                className="w-full bg-transparent text-[11px] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                autoComplete="current-password"
                            />
                            <Eye size={16} className="shrink-0 cursor-pointer text-[var(--muted)]" />
                            <Lock size={16} className="shrink-0 text-[var(--muted)]" />
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-2 text-[var(--muted)]">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    className="h-3 w-3 cursor-pointer accent-[var(--primary)]"
                                />
                                <p>تذكرني</p>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="font-bold text-[var(--primary)] transition hover:text-[var(--primary-deep)]"
                            >
                                نسيت كلمة المرور؟
                            </Link>

                        </div>
                        <button
                            type="submit"
                            className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[var(--primary)] text-xs font-black text-white shadow-[var(--shadow)] transition hover:bg-[var(--primary-deep)]"
                            disabled={loginMutation.isPending}
                        >
                            <ArrowLeft size={16} />
                            {loginMutation.isPending ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </button>
                    </form>
                    <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-[var(--muted)]">
                        <span>لسا ما عندك حساب؟</span>
                        <Link
                            to="/register"
                            className="font-bold text-[var(--primary)] transition hover:text-[var(--primary-deep)]"
                        >
                            أنشئ حساب جديد
                        </Link>
                    </div>
                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-[var(--surface-alt)] px-3 py-3 text-[9px] leading-5 text-[var(--muted)]">
                        <Info size={15} className="shrink-0 text-[var(--primary)]" />
                        تسجيل الدخول والتسجيل محميان. لا تشارك بيانات حسابك مع أي شخص.
                    </div>
                </div>
                <div className="relative flex flex-col overflow-hidden bg-gradient-to-br from-[var(--dark-deep)] via-[var(--dark)] to-[var(--primary-deep)] px-10 py-9 max-sm:px-6">
                    <span className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-dashed border-[var(--primary)]/30"></span>
                    <span className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-dashed border-[var(--primary)]/20"></span>
                    <span className="relative z-10 mb-7 flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold text-white">
                        <Sparkles size={14} />
                        عالم جديد بانتظارك
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
                        className="relative z-10 mt-1 h-[270px] w-full -rotate-[4deg] rounded-[15px] object-cover shadow-[var(--shadow-md)] max-sm:h-[210px]"
                    />
                    <div className="relative z-10 mt-7 flex items-center justify-between gap-3 text-[10px] font-bold text-white">
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
    )
}
