
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useToast } from "../ui/toast/useToast";

export default function Navbar({ onNavigate, isLoggedIn }) {
    const clearAccessToken = useAuthStore(
        (state) => state.clearAccessToken
    );

    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAccessToken();
        onNavigate();
        navigate("/");
        showToast("success", "تم تسجيل خروجك بنجاح");
    };

    return (
        <nav>
            {navLinks.map((link) => (
                <Link
                    to={link.path}
                    onClick={onNavigate}
                    key={link.path}
                    className="flex flex-col gap-2 px-4 py-2 hover:bg-[var(--surface-alt)] transition duration-300 cursor-pointer"
                >
                    <div className="flex items-center justify-between gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--text)] transition duration-300 px-4">
                        <div className="flex flex-1">
                            {link.title}
                        </div>
                        <ArrowLeft size={19} />
                    </div>
                    <hr className="border-t border-[var(--border)] my-2" />
                </Link>
            ))}

            {!isLoggedIn ? (
                <div className="mt-3 border-t border-[var(--border)] pt-3 px-4 flex flex-col gap-3">
                    <Link
                        to="/login"
                        onClick={onNavigate}
                        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-[var(--text)] hover:bg-[var(--surface-alt)] transition"
                    >
                        تسجيل الدخول
                        <ArrowLeft size={19} />
                    </Link>

                    <Link
                        to="/register"
                        onClick={onNavigate}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 mb-5 text-sm font-bold text-white hover:bg-[var(--primary-deep)] transition"
                    >
                        إنشاء حساب جديد
                        <ArrowLeft size={17} />
                    </Link>
                </div>
            ) : (
                <div className="mt-3 border-t border-[var(--border)] pt-3 px-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-4 py-3 mb-5 text-sm font-bold text-red-500 hover:bg-red-500/10 transition"
                    >
                        تسجيل الخروج
                        <ArrowLeft size={19} />
                    </button>
                </div>
            )}
        </nav>
    );
}
