
import Button from '../ui/Button'
import { Search } from "lucide-react";
import cities from '../../data/cities.json'

import { useState } from 'react'

export default function Hero() {

    const [fromCity, setFromCity] = useState({
        destination: '',
        from: '',
        date: '',
        travelers: 1
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(fromCity);
    }

    return (
        <section dir="rtl" className="min-h-screen w-full overflow-hidden bg-[var(--bg)] font-[var(--font)] text-[var(--text)] py-[20px]">

            <div dir='rtl' className="containr  grid w-[100%] grid-cols-2 items-center  justify-between gap-4 pt-9 pb-10 max-lg:w-[100%] max-md:grid-cols-1 text-right p-[10px] max-sm:pt-6 max-sm:pb-8">

                <div className="flex flex-col items-start text-right" dir="rtl">

                    <div className="mb-3 rounded-full bg-[var(--soft-teal)] px-4 py-1.5 text-[10px] font-bold text-[var(--primary-deep)]">
                        ✨ أهلاً فيك بسيرتنا
                    </div>
                    <h1 className="whitespace-pre-line text-[64px] font-black leading-[1.1] text-[var(--text)] max-lg:text-[48px] max-md:text-[40px] max-sm:text-[32px]">
                        المحطة الجاية؟<span className="block text-[var(--primary)]">على كيفك.</span>
                    </h1>
                    <p className="mt-2 max-w-[420px] text-[16px] leading-7 text-[var(--muted)]">
                        من حلب لدمشق، ومن الساحل للجزيرة، اختار الرحلة اللي بتناسبك، اختار مقعدك، وخلّي الطريق علينا.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-5 text-[10px] font-bold text-[var(--text)]">
                        <span className="flex items-center gap-1.5">
                            <span className="text-[var(--primary)]">⊙</span>
                            حجز سهل
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-[var(--primary)]">⊙</span>
                            خيارات متنوعة
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-[var(--primary)]">⊙</span>
                            متابعة رحلتك
                        </span>
                    </div>
                    <div className="mt-7 flex items-center gap-3">

                        <div className="flex -space-x-2 space-x-reverse">
                            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--border)] bg-[#c5d9ed] text-[10px] font-bold">م</span>
                            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--border)] bg-[#e8c5d5] text-[10px] font-bold">ر</span>
                            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--border)] bg-[#b9d8d0] text-[10px] font-bold">س</span>
                            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--border)] bg-[#f5d2a5] text-[10px] font-bold">م</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 text-xs font-bold">
                                <span className="text-amber-400">★★★★★</span>
                                <span className="text-[var(--text)]">4.9/5</span>
                            </div>
                            <p className="mt-1 text-[9px] text-[var(--muted)]">
                                تجربة سفر مميزة لآلاف الركاب
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative h-[360px] w-full max-md:order-2 max-md:h-[350px] max-sm:h-[220px] max-w-[700px] max-lg:mx-auto max-lg:w-[100%]">

                    <img
                        src="https://res.cloudinary.com/dv6aotwvd/image/upload/v1793965559/image_1_smcvub.jpg"
                        alt="المسجد الأموي في دمشق"
                        className="h-full w-full -rotate-[1.5deg] rounded-[22px] object-cover shadow-[var(--shadow-md)]"
                    />

                    <span className="absolute -left-5 top-7 rounded-xl bg-white px-4 py-3 text-right text-[10px] font-bold leading-5 text-[var(--dark)] shadow-[var(--shadow-md)]">
                        📍 14 محافظة
                        <span className="block font-normal text-[var(--muted)]">وجهات متنوعة</span>
                    </span>

                    <span className="absolute -right-4 bottom-12 rounded-xl bg-white px-4 py-3 text-right text-[10px] font-bold leading-5 text-[var(--dark)] shadow-[var(--shadow-md)]">
                        🛡️ سافر براحة
                        <span className="block font-normal text-[var(--muted)]">من أول حجز حتى الوصول</span>
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-lg bg-[var(--dark)]/80 px-3 py-1.5 text-[10px] font-bold text-white">
                        صورة حقيقية من دمشق
                    </span>

                </div>
            </div>
            <div className="mx-[20px]  mb-12 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-[18px] shadow-[var(--shadow-md)] md:mx-[40px] ">

                <div className="mb-4 flex items-center justify-between gap-3">

                    <div className="flex items-center gap-2">
                        <p className="text-[16px] font-bold text-[var(--text)]">
                            وين رحلتك الجاية؟
                        </p>

                        <p className="text-[12px] text-[var(--muted)]">
                            اختار وجهتك وموعد رحلتك بكل سهولة
                        </p>
                    </div>

                    <p className="text-[10px] font-bold text-[var(--primary)]">
                        ✣ الحجز بـ 3 خطوات
                    </p>

                </div>

                <form className="grid grid-cols-[1.2fr_36px_1.2fr_1.2fr_1fr_1.4fr] items-center gap-2 max-lg:grid-cols-3 max-sm:grid-cols-1 p-2 " onSubmit={handleSubmit}>

                    <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                        <label htmlFor="" className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                            من وين؟
                        </label>

                        <select name="" id="" className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-[var(--text)] outline-none" value={fromCity.from} onChange={(e) => setFromCity({ ...fromCity, from: e.target.value })}>
                            {cities.map((city) => (
                                <option value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--soft-teal)] text-lg font-bold text-[var(--primary)] mx-auto hover:transform hover:rotate-[180deg] duration-[0.5s]"  onClick={() => setFromCity({ ...fromCity, from: fromCity.destination, destination: fromCity.from })}>
                        ⇄
                    </div>
                    <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                        <label htmlFor="" className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                            لوين؟
                        </label>

                        <select name="" id="" className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-[var(--text)] outline-none" value={fromCity.destination} onChange={(e) => setFromCity({ ...fromCity, destination: e.target.value })}>
                            {cities.map((city) => (
                                <option value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                        <label htmlFor="" className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                            تاريخ الرحلة
                        </label>

                        <input type="date" id="" className="w-full bg-transparent text-[14px] font-bold text-[var(--text)] outline-none" value={fromCity.date} onChange={(e) => setFromCity({ ...fromCity, date: e.target.value })} />
                    </div>
                    <div className="flex h-[54px] min-w-0 flex-col justify-center rounded-lg border border-[var(--border)] px-3 transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_2px_var(--soft-teal)]">
                        <label htmlFor="" className="mb-0.5 text-[12px] font-semibold text-[var(--muted)]">
                            المسافرين
                        </label>

                        <select name="" id="" className="w-full cursor-pointer bg-transparent text-[14px] font-bold text-[var(--text)] outline-none" value={fromCity.travelers} onChange={(e) => setFromCity({ ...fromCity, travelers: e.target.value })}>
                            <option value="1">1 مسافر</option>
                            <option value="2">2 مسافر</option>
                            <option value="3">3 مسافر</option>
                            <option value="4">4 مسافر</option>
                        </select>
                    </div>
                    <div>
                        <Button className="h-[54px] w-full rounded-lg bg-[var(--primary)] text-[12px] font-bold text-white shadow-[0_7px_18px_rgba(10,169,155,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-deep)]">
                            <Search className="h-4 w-4 inline-block" />  ابحث عن رحلتك
                        </Button>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-4 border-y border-[var(--border)] bg-[var(--surface)] px-[8%] py-5 max-sm:grid-cols-2 gap-4">
                <span className="flex flex-col items-center justify-center gap-1 border-l border-[var(--border)] text-[24px] font-black text-[var(--text)]">
                    14
                    <span className="text-[12px] font-normal text-[var(--muted)]">
                        محافظة سورية
                    </span>
                </span>
                <span className="flex flex-col items-center justify-center gap-1 border-l border-[var(--border)] text-[24px] font-black text-[var(--text)]">
                    4
                    <span className="text-[12px] font-normal text-[var(--muted)]">
                        شركات نقل رئيسية
                    </span>
                </span>
                <span className="flex flex-col items-center justify-center gap-1 border-l border-[var(--border)] text-[24px] font-black text-[var(--text)]">
                    30+
                    <span className="text-[12px] font-normal text-[var(--muted)]">
                        خيار رحلة باليوم
                    </span>
                </span>
                <span className="flex flex-col items-center justify-center gap-1 text-[24px] font-black text-[var(--text)]">
                    24/7
                    <span className="text-[12px] font-normal text-[var(--muted)]">
                        سهولة الوصول للموقع
                    </span>
                </span>
            </div>
        </section>
    )
}
