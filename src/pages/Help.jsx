
import { useState } from "react";
import { Link } from "react-router-dom";
import { Headset, Plus, X, Sparkles } from "lucide-react";

const faqs = [
    {
        question: "كيف بحجز رحلة؟",
        answer: "حدد المحافظات اللي بدك تطلع منها والمحافظة اللي بدك توصل إلها، بعدين اختار التاريخ والشركة والمقاعد، وأكد الحجز."
    },
    {
        question: "في دفع إلكتروني حقيقي؟",
        answer: "لا، الموقع نموذج تجريبي، وخيارات الدفع معروضة لأغراض التصميم فقط."
    },
    {
        question: "التجربة بتعرض مكان الباص الحقيقي؟",
        answer: "لا، الخريطة بتعرض مسار تقريبي ومحاكاة لحركة الباص، والتتبع المباشر GPS API من شركة النقل."
    },
    {
        question: "وين بلاقي حجوزاتي؟",
        answer: "من قائمة حجوزاتي، الحجوزات محفوظة ضمن بيانات المستخدم وبتقدر تشوف تفاصيلها والتذاكر."
    },
    {
        question: "هل في حسابات حقيقية؟",
        answer: "يمكنك إنشاء حساب وتسجيل الدخول لاستخدام ميزات الموقع وإدارة حجوزاتك."
    }
];

export default function Help() {
    const [openItems, setOpenItems] = useState([]);

    function toggleItem(index) {
        setOpenItems((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index]
        );
    }

    return (
        <main dir="rtl" className="min-h-screen bg-[var(--bg)]">
            {/* Page Header */}
            <section className="containr border-b border-[var(--border)] bg-gradient-to-l from-[var(--surface)] to-[var(--surface-alt)] py-6 ">
                <div className=" max-w-7xl py-5 ">
                    <div className="flex flex-col items-start gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/20 px-3 py-1 text-xs font-bold text-[var(--primary)]">
                            <Sparkles size={13} />
                            نحن معك
                        </span>
                        <h1 className="text-2xl font-black text-white sm:text-3xl">
                            شو حابب
                            <span className="text-[var(--primary)]">
                                {" "}تعرف؟
                            </span>
                        </h1>
                        <p className="text-xs leading-6 text-white/65">
                            أسئلة بتساعدك تستخدم نموذج سيرنا بسهولة.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="containr grid max-w-7xl grid-cols-1 items-start gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_225px] lg:gap-8 ">
                {/* Questions */}   
                <div className="order-1 flex flex-col gap-2.5">
                    {faqs.map((faq, index) => {
                        const isOpen = openItems.includes(index);

                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] transition-colors"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-right"
                                >
                                    <span className={`text-xs font-bold transition-colors ${
                                        isOpen
                                            ? "text-[var(--primary)]"
                                            : "text-[var(--text)]"
                                    }`}>
                                        {faq.question}
                                    </span>

                                    <span className="shrink-0 text-[var(--primary)]">
                                        {isOpen ? (
                                            <X size={16} />
                                        ) : (
                                            <Plus size={16} />
                                        )}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="mx-4 border-t border-[var(--border)] px-1 py-3">
                                        <p className="text-xs leading-7 text-[var(--muted)]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Help Card */}
                <aside className="order-2 rounded-xl bg-[var(--soft-teal)] p-6">
                    <div className="mb-3 text-[var(--primary)]">
                        <Headset size={23} />
                    </div>

                    <h2 className="mb-3 text-base font-black text-[var(--text)]">
                        بحاجة لمساعدة؟
                    </h2>

                    <p className="mb-4 text-xs leading-6 text-[var(--muted)]">
                        هذا الموقع نموذج واجهة تجريبية، ويمكنك التنقل
                        بين صفحاته لاكتشاف تجربة الحجز.
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-3 text-xs font-bold text-white transition hover:bg-[var(--primary-deep)]"
                    >
                        رجوع للرئيسية
                    </Link>
                </aside>
            </section>
        </main>
    );
}
