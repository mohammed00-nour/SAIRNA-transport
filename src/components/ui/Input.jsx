
import { forwardRef, useId } from "react";
const Input = forwardRef(function Input(
    {
        label,
        type = "text",
        name,
        id,
        value,
        defaultValue,
        onChange,
        placeholder,
        error,
        helperText,
        disabled = false,
        required = false,
        dir = "rtl",
        className = "",
        inputClassName = "",
        ...props
    },
    ref
) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    return (
        <div className={`flex w-full flex-col gap-2 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-bold text-[var(--text)]"
                >
                    {label}
                    {required && (
                        <span className="mr-1 text-red-500">*</span>
                    )}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                name={name}
                type={type}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                dir={dir}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error ? errorId : helperText ? helperId : undefined
                }
                className={`
                    h-12 w-full rounded-xl border
                    bg-[var(--surface)]
                    px-4 text-sm text-[var(--text)]
                    outline-none transition-all duration-200
                    placeholder:text-[var(--muted)]
                    focus:border-[var(--primary)]
                    focus:ring-2 focus:ring-[var(--primary)]/15
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                            : "border-[var(--border)]"
                    }
                    ${inputClassName}
                `}
                {...props}
            />
            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="text-xs font-medium text-red-500"
                >
                    {error}
                </p>
            )}
            {!error && helperText && (
                <p
                    id={helperId}
                    className="text-xs text-[var(--muted)]"
                >
                    {helperText}
                </p>
            )}
        </div>
    );
});
export default Input;
