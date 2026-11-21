import { Outlet } from "react-router-dom";
import BookingStepper from "../features/booking/components/BookingStepper";

export default function BookingLayout() {
    return (
        <div>
            <BookingStepper />

            <main>
                <Outlet />
            </main>
        </div>
    );
}