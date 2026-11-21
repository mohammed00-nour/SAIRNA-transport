import { navLinks } from '../../data/navLinks'
import Navbar from '../nav/Navbar'

import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { ArrowLeft, Moon, Sun, Menu, Sparkles } from "lucide-react";

import useMe from "../../features/auth/hooks/useMe";
import { useAuthStore } from "../../stores/authStore";

import Logo from '../common/Logo'
import Button from '../ui/Button'
import { useThemeLight } from '../../stores/themeLight'

export default function Header() {
    const theme = useThemeLight((state) => (state.themeLight))
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);
    const { data: user } = useMe();
    const accessToken = useAuthStore((state) => state.accessToken);


    const classStyleForLink = "hover:text-[var(--text)] transition duration-300 cursor-pointer focus:scale-100     active:scale-90 after:content-[''] after:block after:w-[30px] after:h-[4px] after:bg-[var(--primary)] after:scale-x-0 after:origin-x after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-center after:rounded-full after:mt-2 after:mx-auto after:mb-[-15px]";

    return (
        <header dir="rtl" className="relative z-100 sticky top-0 left-0 right-0 shadow-[var(--shadow-md)] transition duration-300 flex flex-col">
            <div className='bg-[var(--dark-deep)] h-6 w-full flex items-center justify-center text-[9px] gap-1 font-bold text-[var(--muted)]'>
                <span className="bg-[var(--primary)]/40 w-[14px] h-[14px] rounded-full flex items-center ">
                    <span className="bg-[var(--primary-deep)] w-[7px] h-[7px] rounded-full mx-auto transform-translate-x-1/2 transform-translate-y-1/2 "></span>
                </span>
                رحلات بين المدن السورية، بخطوات بسيطة وواضحة
                <Sparkles size={12} className="mr-1 text-amber-300" />
            </div>
            <div className='containr flex justify-between items-center w-full py-2 bg-[var(--surface)] relative z-100 sticky top-0 left-0 right-0 shadow-[var(--shadow-md)] transition duration-300'>
                <Logo />

                <nav className="hidden min-[900px]:flex items-center gap-3 text-[14px] font-bold text-[var(--muted)]">
                    {navLinks.map((link) => (
                        <NavLink
                            to={link.path}
                            key={link.path}
                            className={({ isActive }) => {
                                const isBookingActive =
                                    link.path === "/trips" &&
                                    (window.location.pathname.startsWith("/booking") ||
                                        window.location.pathname === "/trips");

                                return `${classStyleForLink} ${isActive || isBookingActive
                                    ? "text-[var(--text)] after:scale-x-100"
                                    : "after:scale-x-0"
                                    }`;
                            }}
                        >
                            {link.title}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-3" dir="ltr">
                    {
                        accessToken ? <Link to="/profile" className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--text)]">
                                {user?.name || "مستخدم"}
                            </span>
                            <span to="/profile" className="grid h-8 w-8 place-items-center rounded-full bg-[var(--soft-teal)] text-[12px] font-bold text-[var(--primary)]">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} />
                                ) : (
                                    <span>
                                        {user?.name?.trim()?.charAt(0) || "؟"}
                                    </span>
                                )}
                            </span>
                        </Link> : <>
                            <Button variant={"secondary"} onClick={() => { window.location.href = '/register' }} className="min-[900px]:flex hidden">
                                <ArrowLeft size={16} />
                                إنشاء حساب
                            </Button>

                            <Link to='/login' className="text-sm font-bold text-[var(--text)] hover:text-teal-600 transition sm:block hidden">
                                دخول
                            </Link>
                        </>
                    }
                    <Button
                        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
                        variant={"primary"} size={"medium"} className="min-[900px]:hidden">
                        <Menu size={19} />
                    </Button>
                    <Button variant="primary" size="medium"
                        onClick={() => { useThemeLight.setState({ themeLight: theme === "light" ? "dark" : "light" }) }}>
                        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
                    </Button>
                </div>
                {isMenuOpen && (
                    <>
                        <div className="absolute top-0 right-0 z-50 w-full bg-[var(--surface)] px-[20px] py-[8px] shadow-lg [min-900px]:hidden left-12 transition-transform duration-300 ease-in-out">
                            <div className="flex items-center justify-between">
                                <Logo />
                                <Button variant='primary' size='medium' className='absolute top-4 left-[20px] text-[23px] px-2.5 py-0 '
                                    onClick={() => { setIsMenuOpen(false) }}>
                                    X
                                </Button>
                            </div>
                            <div className="mt-4">
                                <Navbar
                                    isLoggedIn={Boolean(accessToken)}
                                    onNavigate={() => setIsMenuOpen(false)}
                                />
                            </div>
                        </div>
                    </>
                )
                }
            </div>
        </header>
    )
}