export default function Button({ children, variant = "primary", size = "medium", className = "", ...props }) {
    const variants = {
        primary: "border border-slate-200 hover:border-[var(--primary)] text-[var(--text)] hover:bg-[var(--surface-alt)] transition hover:text-[var(--primary)] rounded-xl",
        secondary: "flex items-center gap-2 rounded-xl bg-[var(--dark-deep)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--dark)] transition duration-300 cursor-pointer focus:scale-100 active:scale-90 sm:flex hidden",
        outline: "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
        ghost: "text-[var(--text)] hover:bg-[var(--surface-alt)]",
    };
    
    const sizes = {
        small: "px-2 py-2 text-sm",
        medium: "p-2 text-[12px]",
        large: "px-6 py-3 text-lg",
        extraLarge: "px-8 py-4 text-xl",
        icon: "h-10 w-10 flex items-center justify-center p-0", 
    };

    return (
        <button
            className={`${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}