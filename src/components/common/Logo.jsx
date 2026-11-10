import { Link } from 'react-router-dom'

export default function Logo({ color = "" }) {
    return (
        <Link className="flex items-center gap-2 corsor-pointer relative z-10 w-[130px] md:w-[150px]" to="/" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12">
                <defs><linearGradient id="a" x1="0" x2="1" y2="1"><stop stopColor="#20c4ae" /><stop offset="1" stopColor="#008a98" /></linearGradient></defs><rect x="2" y="3" width="60" height="58" rx="20" fill="url(#a)" /><path d="M11 39V23c0-6 5-10 11-10h20c7 0 12 5 12 12v15H11Z" fill="#fff" /><rect x="17" y="20" width="29" height="13" rx="4" fill="#b8eaf0" /><path d="m29 20 7 13" stroke="#fff" strokeWidth="2" /><rect x="10" y="36" width="45" height="10" rx="5" fill="#f2fafb" /><circle cx="22" cy="45" r="5.2" fill="#103d51" stroke="#fff" strokeWidth="2" /><circle cx="44" cy="45" r="5.2" fill="#103d51" stroke="#fff" strokeWidth="2" /><path d="M12 28h5M48 28h5" stroke="#0d7893" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-start justify-center text-left">
                <h1 className={` text-${color !== "" ? "#fff" : "var(--text)"}  text-[24px] md:text-[32px]  font-extrabold `}>سيرنا<span className="text-[var(--primary)]">.</span></h1>
                <p className="text-[var(--muted)] text-[8px] md:text-[10px]">رحلتك بتبلّش من هون</p>
            </div>
        </Link>
    )
}