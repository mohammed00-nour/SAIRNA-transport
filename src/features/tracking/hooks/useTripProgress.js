
import { useEffect, useState } from "react";

export const useTripProgress = (departureAt, arrivalAt) => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const departureTime = new Date(departureAt).getTime();
    const arrivalTime = new Date(arrivalAt).getTime();

    if (
        !departureAt ||
        !arrivalAt ||
        !Number.isFinite(departureTime) ||
        !Number.isFinite(arrivalTime) ||
        arrivalTime <= departureTime
    ) {
        return {
            progress: 0,
            status: "unknown",
            remainingTime: 0,
        };
    }

    const totalDuration = arrivalTime - departureTime;
    const elapsedTime = currentTime - departureTime;

    const progress = Math.min(
        100,
        Math.max(0, (elapsedTime / totalDuration) * 100)
    );

    const remainingTime = Math.max(0, arrivalTime - currentTime);

    let status = "upcoming";

    if (currentTime >= arrivalTime) {
        status = "completed";
    } else if (currentTime >= departureTime) {
        status = "inProgress";
    }

    return {
        progress,
        status,
        remainingTime,
    };
};
