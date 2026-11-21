
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function About() {
    const imageUrl =
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85";

    return (
        <main dir="rtl" className=" min-h-screen bg-[var(--bg)]">
            {/* Intro */}
            <section className="containr border-b border-[var(--border)] py-5 bg-gradient-to-l from-[var(--surface)] to-[var(--surface-alt)]">
                <div className=" max-w-7xl  py-5 ">
                    <div className="flex flex-col items-start gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/20 px-3 py-1 text-xs font-bold text-[var(--primary)]">
                            <Sparkles size={13} />
                            قصتنا
                        </span>
                        <h1 className="text-2xl font-black text-white sm:text-3xl">
                            سيرنا.
                            <span className="text-[var(--primary)]">
                                {" "}رحلة أبسط لكل حدا.
                            </span>
                        </h1>
                        <p className="text-xs leading-6 text-white/65 sm:text-sm">
                            فكرة موقع لحجز الرحلات البرية بين المحافظات السورية، أُنشئ كنموذج تعليمي لتقديم تصميم مفهوم وسهل الاستخدام.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="containr grid max-w-7xl grid-cols-1 items-center gap-10 py-12 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-16">
                {/* Text - Right */}
                <div className="order-1 flex flex-col items-start">
                    <h2 className="mb-4 text-xl font-black text-[var(--text)] sm:text-2xl">
                        فكرة صغيرة... تجربة كبيرة.
                    </h2>
                    <p className="mb-4 text-xs leading-7 text-[var(--muted)] sm:text-sm">
                        بدأنا بتجربة هدفها تسهيل التنقل بين المحافظات، من لحظة اختيار مدينة الانطلاق والوصول، مروراً بمقارنة الشركات، اختيار المقاعد، تأكيد التذكرة، ومشاهدة مسار الرحلة على الخريطة.
                    </p>
                    <p className="mb-5 text-xs leading-7 text-[var(--muted)] sm:text-sm">
                        تم تطوير هذا النموذج باستخدام HTML وCSS وJavaScript وReact، ليكون مثالاً عملياً على تجربة حجز متكاملة وبسيطة.
                    </p>
                    <Link
                        to="/trips"
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-xs font-bold text-white transition hover:bg-[var(--primary-deep)]"
                    >
                        جرّب رحلة
                        <ArrowLeft size={16} />
                    </Link>
                </div>

                {/* Image - Left */}
                <div className="order-2 block overflow-hidden rounded-2xl" >
                    <img
                        src={imageUrl}
                        alt="منظر البحر عند الغروب"
                        className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[304px]"
                    />
                </div>
            </section>
        </main>
    );
}
