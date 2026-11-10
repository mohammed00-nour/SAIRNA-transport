
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

const images = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Syria%2C_Damascus%2C_The_Umayyad_Mosque.jpg",
        alt: "الجامع الأموي في دمشق",
        city: "دمشق",
        description: "مدينة الياسمين",
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Citadel_of_Aleppo%2C_Gates%2C_Aleppo%2C_Syria.jpg",
        alt: "قلعة حلب",
        city: "حلب",
        description: "عاصمة الشهباء",
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/7/73/%D9%88%D8%A7%D8%AF%D9%8A_%D9%82%D9%86%D8%AF%D9%8A%D9%84_%28wadi_kandel_%29.jpg",
        alt: "ساحل اللاذقية",
        city: "اللاذقية",
        description: "نسمة من البحر",
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Homs_Khalid_Ibn_al-Walid_Mosque_3056.jpg/3840px-Homs_Khalid_Ibn_al-Walid_Mosque_3056.jpg",
        alt: "جامع خالد بن الوليد في حمص",
        city: "حمص",
        description: "قلب سوريا",
    },
];

export default function ExplorSy() {
    return (
        <section dir="rtl" className="w-full bg-[var(--bg)] px-6 py-16 font-[var(--font)] text-[var(--text)] transition-colors duration-300 md:px-10">
            <div className="mx-auto max-w-[1216px]">
                <div className="mb-8 flex items-end justify-between gap-5 max-sm:flex-col max-sm:items-start">
                    <div>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-[10px] font-bold text-[var(--primary)]">
                            <Sparkles size={13} />
                            اكتشف سوريا
                        </span>
                        <h2 className="text-[32px] font-black leading-tight text-[var(--text)] max-sm:text-2xl">
                            على وين حابب{" "}
                            <span className="text-[var(--primary)]">تسافر؟</span>
                        </h2>
                        <p className="mt-3 text-xs text-[var(--muted)]">
                            وجهات مختلفة، ونفس الشعور الحلو لما تكون بالطريق.
                        </p>
                    </div>
                    <Link to="/trips" className="group mb-1 flex shrink-0 items-center gap-2 text-xs font-bold text-[var(--primary)] transition hover:text-[var(--primary-deep)]">
                        استكشف الرحلات
                        <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
                    {images.map((image) => (
                        <Link to="/trips" key={image.city} className="group relative h-[288px] overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface-alt)] shadow-[var(--shadow)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                            <img src={image.image} alt={image.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-deep)]/90 via-[var(--dark-deep)]/10 to-transparent transition-all duration-500 group-hover:from-[var(--dark-deep)]/75 group-hover:via-[var(--primary-deep)]/10"></div>
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                                <div className="transition-transform duration-500 group-hover:-translate-y-1">
                                    <h3 className="text-[21px] font-black text-white">{image.city}</h3>
                                    <p className="mt-1 text-[11px] font-medium text-white/75">{image.description}</p>
                                </div>
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white">
                                    <ArrowLeft size={19} className="transition-transform duration-300 group-hover:-translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
