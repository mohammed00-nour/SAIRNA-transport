
import { Sparkles, Search, BusFront, Ticket } from "lucide-react";

const boxes = [
    {
        number: "01",
        icon: Search,
        title: "اختار وجهتك",
        description: "حدد من وين لوين وتاريخ الرحلة المناسب إلك.",
        iconColor: "text-[var(--primary)]",
        iconBg: "bg-[var(--soft-teal)]",
    },
    {
        number: "02",
        icon: BusFront,
        title: "لقي رحلتك",
        description: "قارن الشركات والمواعيد والأسعار واختر الأفضل.",
        iconColor: "text-[#e99a37]",
        iconBg: "bg-[#fff3e3]",
    },
    {
        number: "03",
        icon: Ticket,
        title: "احجز مقعدك",
        description: "اختار مقعدك وأكد الحجز، وتذكرتك تصير جاهزة.",
        iconColor: "text-[#5789e6]",
        iconBg: "bg-[#eaf0ff]",
    },
];

export default function ThreeClicks() {
    return (
        <section dir="rtl" className="w-full bg-[var(--surface-alt)] px-6 py-16 font-[var(--font)] text-[var(--text)] transition-colors duration-300 md:px-10">
            <div className="mx-auto max-w-[1216px]">
                <div className="mb-8 flex flex-col items-center text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                        <Sparkles size={13} />
                        السفر صار أبسط
                    </span>
                    <h2 className="text-[32px] font-black leading-tight text-[var(--text)] max-sm:text-2xl">
                        3 خطوات... <span className="text-[var(--primary)]">وتكون بالطريق</span>
                    </h2>
                    <p className="mt-3 text-xs text-[var(--muted)]">
                        ما في داعي للتعقيد، كل شي مرتب بواجهة وحدة.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {boxes.map((box, index) => {
                        const Icon = box.icon;
                        return (
                            <article key={box.number} className={`group relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-all duration-500 ${index === 2 ? "hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]" : "hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"}`}>
                                <span className="absolute left-6 top-3 text-[50px] font-black leading-none text-[var(--muted)] opacity-[0.12] transition-all duration-500 group-hover:opacity-25">
                                    {box.number}
                                </span>
                                <div className="relative z-10 flex h-[60px] w-[60px] items-center justify-center rounded-[18px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <div className={`flex h-full w-full items-center justify-center rounded-[18px] ${box.iconBg}`}>
                                        <Icon size={27} className={box.iconColor} strokeWidth={2} />
                                    </div>
                                </div>
                                <h3 className="relative z-10 mt-5 text-[17px] font-black text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--primary)]">
                                    {box.title}
                                </h3>
                                <p className="relative z-10 mt-2 text-[11px] leading-6 text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text)]">
                                    {box.description}
                                </p>
                                <div className="absolute bottom-0 right-0 h-1 w-0 rounded-full bg-[var(--primary)] transition-all duration-500 group-hover:w-full"></div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
