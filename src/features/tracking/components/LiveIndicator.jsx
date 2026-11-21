
import { Radio } from "lucide-react";

function LiveIndicator({ status }) {
    const labels = {
        upcoming: "الرحلة لم تنطلق بعد",
        inProgress: "الرحلة قيد العرض",
        completed: "وصلت الرحلة إلى وجهتها",
        unknown: "حالة الرحلة غير متاحة",
    };

    const isActive = status === "inProgress";

    return (
        <div
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{
                backgroundColor: isActive
                    ? "var(--soft-teal)"
                    : "var(--surface-alt)",
                color: isActive
                    ? "var(--primary-deep)"
                    : "var(--muted)",
            }}
        >
            <span className="relative flex h-2.5 w-2.5">
                {isActive && (
                    <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ backgroundColor: "var(--primary)" }}
                    />
                )}

                <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{
                        backgroundColor: isActive
                            ? "var(--primary)"
                            : "var(--muted)",
                    }}
                />
            </span>

            <Radio size={16} />

            <span>{labels[status] ?? labels.unknown}</span>
        </div>
    );
}

export default LiveIndicator;
