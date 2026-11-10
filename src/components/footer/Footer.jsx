
import { Link } from "react-router-dom";
import { Mail, Phone, Globe } from "lucide-react";
import Logo from "../common/Logo";

export default function Footer() {
    return (
        <footer dir="rtl" className="w-full border-t border-[var(--border)] bg-[var(--dark-deep)] px-5 pt-10 font-[var(--font)] text-white transition-colors duration-300 sm:px-8 sm:pt-12 md:px-10">
            <div className="mx-auto max-w-[1216px]">
                <div className="grid grid-cols-4 gap-8 pb-9 max-lg:grid-cols-2 max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-9">
                    <div className="col-span-1 flex flex-col items-start max-lg:col-span-2 max-sm:col-span-2">
                        <Logo  />
                        <p className="mt-4 max-w-[280px] text-[11px] leading-7 text-[var(--muted)] max-sm:max-w-full">
                            طريقة أسهل وأسرع للسفر بين المحافظات السورية. احجز، اختار، وجهز حالك لرحلة.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <a href="tel:+963000000000" aria-label="اتصل بنا" className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]">
                                <Phone size={15} />
                            </a>
                            <a href="mailto:hello@sairna.example" aria-label="البريد الإلكتروني" className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]">
                                <Mail size={15} />
                            </a>
                            <a href="#" aria-label="الموقع الإلكتروني" className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--primary)] hover:bg-[var(--soft-teal)] hover:text-[var(--primary)]">
                                <Globe size={15} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-5 text-[12px] font-black text-white">استكشف</h3>
                        <ul className="flex flex-col gap-4 text-[10px] font-medium text-[var(--muted)]">
                            <li><Link to="/" className="transition hover:text-[var(--primary)]">الرئيسية</Link></li>
                            <li><Link to="/trips" className="transition hover:text-[var(--primary)]">احجز رحلتك</Link></li>
                            <li><Link to="/companies" className="transition hover:text-[var(--primary)]">شركات النقل</Link></li>
                            <li><Link to="/tracking" className="transition hover:text-[var(--primary)]">تتبع رحلتك</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-5 text-[12px] font-black text-white">حسابك</h3>
                        <ul className="flex flex-col gap-4 text-[10px] font-medium text-[var(--muted)]">
                            <li><Link to="/login" className="transition hover:text-[var(--primary)]">تسجيل الدخول</Link></li>
                            <li><Link to="/register" className="transition hover:text-[var(--primary)]">إنشاء حساب</Link></li>
                            <li><Link to="/bookings" className="transition hover:text-[var(--primary)]">حجوزاتي</Link></li>
                            <li><Link to="/profile" className="transition hover:text-[var(--primary)]">الملف الشخصي</Link></li>
                        </ul>
                    </div>
                    <div className="max-lg:col-span-2">
                        <h3 className="mb-5 text-[12px] font-black text-white">نحن هون لنساعدك</h3>
                        <ul className="flex flex-col gap-4 text-[10px] font-medium text-[var(--muted)]">
                            <li><Link to="/about" className="transition hover:text-[var(--primary)]">عن سيرنا</Link></li>
                            <li><Link to="/help" className="transition hover:text-[var(--primary)]">مركز المساعدة</Link></li>
                            <li>
                                <a href="mailto:hello@sairna.example" className="flex items-center gap-2 transition hover:text-[var(--primary)]">
                                    <Mail size={13} />
                                    hello@sairna.example
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[var(--border)] py-5">
                    <p className="text-center text-[9px] leading-6 text-[var(--muted)]">
                        جميع الحقوق محفوظة © {new Date().getFullYear()} سيرنا. صُنع بكل حب لتسهيل رحلاتك.
                    </p>
                </div>
            </div>
        </footer>
    );
}
