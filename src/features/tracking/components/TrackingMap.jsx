
import { useEffect, useMemo, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Polyline,
    CircleMarker,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// حساب المسافة بين نقطتين بالكيلومتر
const getDistance = (pointA, pointB) => {
    const earthRadius = 6371;
    const toRadians = (value) => (value * Math.PI) / 180;

    const lat1 = toRadians(pointA[0]);
    const lat2 = toRadians(pointB[0]);
    const deltaLat = toRadians(pointB[0] - pointA[0]);
    const deltaLng = toRadians(pointB[1] - pointA[1]);

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLng / 2) ** 2;

    return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// تحديد موقع الباص على المسار حسب نسبة التقدم
const getBusPosition = (coordinates, progress) => {
    if (!coordinates?.length) return null;

    if (coordinates.length === 1) return coordinates[0];

    const distances = [];
    let totalDistance = 0;

    for (let i = 1; i < coordinates.length; i++) {
        const distance = getDistance(
            coordinates[i - 1],
            coordinates[i]
        );

        distances.push(distance);
        totalDistance += distance;
    }

    if (totalDistance === 0) return coordinates[0];

    const targetDistance =
        totalDistance * Math.min(100, Math.max(0, progress)) / 100;

    let coveredDistance = 0;

    for (let i = 0; i < distances.length; i++) {
        const segmentDistance = distances[i];

        if (coveredDistance + segmentDistance >= targetDistance) {
            const segmentProgress =
                segmentDistance === 0
                    ? 0
                    : (targetDistance - coveredDistance) / segmentDistance;

            const start = coordinates[i];
            const end = coordinates[i + 1];

            return [
                start[0] + (end[0] - start[0]) * segmentProgress,
                start[1] + (end[1] - start[1]) * segmentProgress,
            ];
        }

        coveredDistance += segmentDistance;
    }

    return coordinates[coordinates.length - 1];
};

// أيقونة الباص
const busIcon = L.divIcon({
    className: "tracking-bus-icon",
    html: `
        <div style="
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0aa99b;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 3px 12px rgba(0,0,0,.3);
            color: white;
            font-size: 21px;
        ">
            🚌
        </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
});

// ضبط حدود الخريطة
function FitMap({ positions }) {
    const map = useMap();

    useEffect(() => {
        if (!positions || positions.length === 0) return;

        const bounds = L.latLngBounds(positions);

        if (bounds.isValid()) {
            map.fitBounds(bounds, {
                padding: [40, 40],
                maxZoom: 12,
            });
        }
    }, [map, positions]);

    return null;
}

function TrackingMap({ trip, progress = 0, onDistanceChange }) {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [isLoadingRoute, setIsLoadingRoute] = useState(true);
    const [routeError, setRouteError] = useState(false);

    const origin = trip?.origin;
    const destination = trip?.destination;

    const originPosition = useMemo(() => {
        const lat = Number(origin?.latitude);
        const lng = Number(origin?.longitude);

        if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng) ||
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
        ) {
            return null;
        }

        return [lat, lng];
    }, [origin?.latitude, origin?.longitude]);

    const destinationPosition = useMemo(() => {
        const lat = Number(destination?.latitude);
        const lng = Number(destination?.longitude);

        if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng) ||
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
        ) {
            return null;
        }

        return [lat, lng];
    }, [destination?.latitude, destination?.longitude]);

    // جلب المسار الفعلي من OSRM
    useEffect(() => {
        if (!originPosition || !destinationPosition) {
            setRouteCoordinates([]);
            setRouteError(true);
            setIsLoadingRoute(false);
            return;
        }

        const controller = new AbortController();

        const fetchRoute = async () => {
            setIsLoadingRoute(true);
            setRouteError(false);
            setRouteCoordinates([]);

            try {
                const [originLat, originLng] = originPosition;
                const [destinationLat, destinationLng] =
                    destinationPosition;

                const url =
                    `https://router.project-osrm.org/route/v1/driving/` +
                    `${originLng},${originLat};${destinationLng},${destinationLat}` +
                    `?overview=full&geometries=geojson`;

                const response = await fetch(url, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("تعذر جلب مسار الرحلة");
                }

                const data = await response.json();

                const route = data.routes?.[0];

                if (
                    data.code !== "Ok" ||
                    !route?.geometry?.coordinates?.length
                ) {
                    throw new Error("لم يتم العثور على مسار");
                }

                // OSRM يرجع [longitude, latitude]
                // Leaflet يحتاج [latitude, longitude]
                const coordinates = route.geometry.coordinates.map(
                    ([lng, lat]) => [lat, lng]
                );

                setRouteCoordinates(coordinates);

                const distance = route.distance / 1000;

                onDistanceChange?.(distance);
            } catch (error) {
                if (error.name === "AbortError") return;

                console.error("Tracking route error:", error);

                setRouteError(true);
                setRouteCoordinates([]);
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingRoute(false);
                }
            }
        };

        fetchRoute();

        return () => controller.abort();
    }, [
        originPosition,
        destinationPosition,
        onDistanceChange,
    ]);

    // موقع الباص يتغير حسب تقدم الرحلة
    const busPosition = useMemo(() => {
        if (!routeCoordinates.length) return null;

        return getBusPosition(routeCoordinates, progress);
    }, [routeCoordinates, progress]);

    // تثبيت نقاط الخريطة حتى لا يعاد ضبطها كل Render
    const mapPositions = useMemo(() => {
        if (routeCoordinates.length) {
            return routeCoordinates;
        }

        if (originPosition && destinationPosition) {
            return [originPosition, destinationPosition];
        }

        return [];
    }, [
        routeCoordinates,
        originPosition,
        destinationPosition,
    ]);

    if (!originPosition || !destinationPosition) {
        return (
            <div
                className="flex h-[420px] items-center justify-center rounded-2xl border p-6 text-center"
                style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                }}
            >
                إحداثيات المدن غير متوفرة لعرض الخريطة.
            </div>
        );
    }

    return (
        <div
            className="relative h-[420px] w-full z-[10] overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow)]"
        >
            <MapContainer
                center={originPosition}
                zoom={7}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitMap positions={mapPositions} />

                {/* مسار الرحلة الفعلي */}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        positions={routeCoordinates}
                        pathOptions={{
                            color: "#0aa99b",
                            weight: 6,
                            opacity: 0.9,
                            lineCap: "round",
                            lineJoin: "round",
                        }}
                    />
                )}

                {/* نقطة الانطلاق */}
                <CircleMarker
                    center={originPosition}
                    radius={9}
                    pathOptions={{
                        color: "#ffffff",
                        weight: 3,
                        fillColor: "#0aa99b",
                        fillOpacity: 1,
                    }}
                >
                    <Popup>
                        <strong>نقطة الانطلاق</strong>
                        <br />
                        {origin.name}
                    </Popup>
                </CircleMarker>

                {/* نقطة الوصول */}
                <CircleMarker
                    center={destinationPosition}
                    radius={9}
                    pathOptions={{
                        color: "#ffffff",
                        weight: 3,
                        fillColor: "#103a4e",
                        fillOpacity: 1,
                    }}
                >
                    <Popup>
                        <strong>نقطة الوصول</strong>
                        <br />
                        {destination.name}
                    </Popup>
                </CircleMarker>

                {/* الباص على المسار */}
                {busPosition && (
                    <Marker
                        position={busPosition}
                        icon={busIcon}
                        zIndexOffset={1000}
                    >
                        <Popup>
                            <strong>موقع الباص التقريبي</strong>
                            <br />
                            تقدم الرحلة: {Math.round(progress)}%
                        </Popup>
                    </Marker>
                )}
            </MapContainer>

            {/* حالة تحميل المسار */}
            {isLoadingRoute && (
                <div
                    className="absolute left-3 top-3 z-[1000] flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-md"
                    style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                    }}
                >
                    <span
                        className="h-2 w-2 animate-pulse rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                    />
                    جاري تحديد مسار الرحلة...
                </div>
            )}

            {/* تعذر تحميل الطريق */}
            {routeError && !isLoadingRoute && (
                <div
                    className="absolute bottom-3 left-3 right-3 z-[1000] rounded-xl border px-4 py-3 text-center text-xs shadow-md"
                    style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                    }}
                >
                    تعذر تحميل مسار الطريق حالياً. يمكنك مشاهدة موقعي الانطلاق والوصول على الخريطة.
                </div>
            )}

            {/* مؤشر نوع الموقع */}
            <div
                className="absolute bottom-3 right-3 z-[1000] flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] shadow-md"
                style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                }}
            >
                <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: "#0aa99b" }}
                />
                موقع الباص التقريبي
            </div>
        </div>
    );
}

export default TrackingMap;
