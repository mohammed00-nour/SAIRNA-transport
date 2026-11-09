import { Link } from 'react-router-dom'
import { navLinks } from '../../data/navLinks'

import { ChevronDown } from "lucide-react";

export default function Navbar() {
    return (
        <nav className=''>
            {navLinks.map((link, index) => {
                return (
                    <div key={index} className="flex flex-col gap-2 px-4 py-2 hover:bg-[var(--surface-alt)] transition duration-300 cursor-pointer focus:scale-100 active:scale-90">
                        <div className="flex items-center justify-between gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--text)] transition duration-300 cursor-pointer focus:scale-100 active:scale-90 px-4">
                            <Link to={link.path} key={index} className="flex flex-col " > {link.title}</Link>
                            <ChevronDown size={19} />
                        </div>
                        <hr className="border-t border-slate-200 my-2" />
                    </div>
                )
            })}
        </nav>
    )
}