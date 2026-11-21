
import { MapPin, Flag } from "lucide-react";

function TripProgress({
    origin,
    destination,
    progress,
    status,
    remainingTime,
}) {
    const remainingMinutes = Math.ceil(remainingTime / 60000);
    const remainingHours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;

    const remainingLabel =
        status === "completed"
            ? "وصلت الرحلة"
            : status === "upcoming"
                ? "بانتظار الانطلاق"
                : `${remainingHours > 0 ? `${remainingHours} ساعة ` : ""}${minutes} دقيقة متبقية`;

    return (
        <div
            className="rounded-2xl border p-5"
            style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h3
                        className="font-bold"
                        style={{ color: "var(--text)" }}
                    >
                        تقدم الرحلة
                    </h3>

                    <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--muted)" }}
                    >
                        {remainingLabel}
                    </p>
                </div>

                <span
                    className="text-lg font-bold"
                    style={{ color: "var(--primary)" }}
                >
                    {Math.round(progress)}%
                </span>
            </div>

            <div
                className="relative mb-6 h-3 overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--surface-alt)" }}
            >
                <div
                    className="absolute right-0 top-0 h-full rounded-full transition-all duration-1000"
                    style={{
                        width: `${progress}%`,
                        background: "linear-gradient(to left, var(--primary), var(--primary-deep))",
                    }}
                />
            </div>

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                    <MapPin
                        className="shrink-0"
                        style={{ color: "var(--primary)" }}
                        size={19}
                    />

                    <span
                        className="font-semibold"
                        style={{ color: "var(--text)" }}
                    >
                        {origin}
                    </span>
                </div>

                <div className="flex items-center gap-2 min-w-0">
                    <span
                        className="font-semibold"
                        style={{ color: "var(--text)" }}
                    >
                        {destination}
                    </span>

                    <Flag
                        className="shrink-0"
                        style={{ color: "var(--primary)" }}
                        size={19}
                    />
                </div>
            </div>
        </div>
    );
}

export default TripProgress;
