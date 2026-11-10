
import { Link } from "react-router-dom";
import { Sparkles, MapPin, CircleCheck, ArrowLeft, Navigation, MapPinned} from "lucide-react";

export default function TrackTrip() {
    return (
        <section dir="rtl" className="w-full bg-[var(--bg)] px-6 py-16 font-[var(--font)] text-[var(--text)] transition-colors duration-300 md:px-10">
            <div className="mx-auto max-w-[1216px]">
                <div className="grid min-h-[410px] grid-cols-[1.2fr_1fr] overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] max-lg:grid-cols-1">
                    <div className="flex flex-col justify-center px-10 py-10 max-sm:px-6">
                        <span className="mb-4 flex w-fit items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                            <Sparkles size={13} />
                            وين وصلت الرحلة؟
                        </span>
                        <h2 className="text-[30px] font-black leading-[1.6] text-[var(--text)] max-sm:text-2xl">
                            الطريق قدامك.
                            <br />
                            <span className="text-[var(--primary)]">لحظة بلحظة!</span>
                        </h2>
                        <p className="mt-3 max-w-[390px] text-[11px] leading-7 text-[var(--muted)]">
                            بصفحة التتبع بتشوف خط سير الرحلة ومحطاتها وحالتها ضمن نموذج تفاعلي سهل وواضح.
                        </p>
                        <div className="mt-4 flex flex-col gap-3">
                            <p className="flex items-center gap-2 text-[11px] font-bold text-[var(--text)]">
                                <CircleCheck size={15} className="text-[var(--primary)]" />
                                عرض المسار على الخريطة
                            </p>
                            <p className="flex items-center gap-2 text-[11px] font-bold text-[var(--text)]">
                                <CircleCheck size={15} className="text-[var(--primary)]" />
                                وقت وصول تقريبي ومحطات الطريق
                            </p>
                        </div>
                        <Link to="/tracking" className="mt-6 flex w-fit items-center gap-2 rounded-[10px] bg-[var(--primary)] px-5 py-3 text-[11px] font-black text-white shadow-[var(--shadow)] transition hover:bg-[var(--primary-deep)]">
                            جرّب تتبّع رحلة
                            <ArrowLeft size={15} />
                        </Link>
                        <p className="mt-3 text-[9px] text-[var(--muted)]">
                            * التجربة واجهة أمامية في هذا النموذج وليست GPS حقيقي.
                        </p>
                    </div>
                    <div dir="rtl" className="flex flex-col justify-center bg-[#f0f6f3] px-7 py-8 max-sm:px-4">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-[10px] font-bold text-[#215467]">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--primary-deep)] ring-4 ring-[var(--primary)]"></span>
                                محاكاة مسار رحلة
                            </span>
                            <span className="text-[10px] font-bold text-[var(--muted)]">
                                حلب - دمشق
                            </span>
                        </div>
                        <div className="relative h-[224px] overflow-hidden rounded-[15px] bg-[var(--surface)] shadow-[var(--shadow)]">
                            <iframe
                                title="خريطة مسار الرحلة"
                                src="https://maps.google.com/maps?q=Homs%2C%20Syria&z=8&output=embed"
                                className="h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Homs%2C%20Syria"
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-[var(--surface)] px-3 py-2 text-[9px] font-bold text-[var(--text)] shadow-md transition hover:text-[var(--primary)]"
                            >
                                Google Maps
                                <Navigation size={12} />
                            </a>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--dark)] dark:text-[var(--text)]">
                                حلب
                                <MapPin size={13} />
                            </span>
                            <div className="relative h-px flex-1 bg-[var(--border)]">
                                <span className="absolute right-[40%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--primary-deep)] ring-4 ring-[var(--primary-deep)]"></span>
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--dark)] dark:text-[var(--text)]">
                                دمشق
                                <MapPin size={13} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative mt-16 overflow-hidden rounded-[20px] bg-gradient-to-l from-[var(--primary)] via-[#0b756e] to-[#0e4653] px-12 py-8 text-white max-sm:px-6">
                    <span className="absolute -top-32 left-[35%] h-64 w-64 rounded-full border border-white/10"></span>
                    <span className="absolute -bottom-40 left-[45%] h-64 w-64 rounded-full border border-white/10"></span>
                    <div className="relative z-10 flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-start">
                        <div>
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold text-white/90">
                                <Sparkles size={13} />
                                جاهز لتجربة جديدة؟
                            </span>
                            <h2 className="text-[25px] font-black max-sm:text-xl">
                                الطريق الجاي بيناديك.
                            </h2>
                            <p className="mt-2 text-[11px] text-white/75">
                                دوّر على رحلة، واحجز أول مقعد إلك.
                            </p>
                        </div>
                        <Link to="/trips" className="flex shrink-0 items-center gap-2 rounded-[10px] bg-white px-5 py-3 text-[11px] font-black text-[var(--dark)] transition hover:bg-[var(--soft-teal)] hover:text-[var(--primary-deep)]">
                            يلا نلاقي رحلة
                            <ArrowLeft size={15} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
