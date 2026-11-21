
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useThemeLight } from './stores/themeLight'
import { useEffect } from 'react'

import { ProtectedRoute } from './features/auth/components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import About from "./pages/About";
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import BookTrip from './pages/BookTrip'
import BookingLayout from './layouts/BookingLayout'
import TransportCompanies from "./pages/TransportCompanies"
import MyBookings from './pages/MyBookings'
import TrackTrip from "./features/tracking/pages/TrackTrip"
import TestMap from './pages/TestMap'
import Help from "./pages/Help";

import SelectSeats from './features/booking/pages/SelectSeats'
import PassengerDetails from './features/booking/pages/PassengerDetails'
import BookingReview from './features/booking/pages/BookingReview'
import BookingSuccess from './features/booking/pages/BookingSuccess'

function App() {
    const themeLight = useThemeLight((state) => state.themeLight)

    useEffect(() => {
        const root = document.documentElement

        root.classList.toggle("dark", themeLight === "dark")
        root.style.colorScheme = themeLight
    }, [themeLight])

    return (
        <main
            dir="rtl"
            className="bg-[var(--bg)] text-[var(--text)] min-h-screen w-full"
        >
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/about' element={<About/>} />  
                    <Route path="help" element={<Help />} />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="my-bookings"
                        element={
                            <ProtectedRoute>
                                <MyBookings />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="track-trip"
                        element={
                            <ProtectedRoute>
                                <TrackTrip />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="track-trip/:bookingId"
                        element={
                            <ProtectedRoute>
                                <TrackTrip />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="trips" element={<BookTrip />} />
                    <Route
                        path="transport-companies"
                        element={<TransportCompanies />}
                    />

                    <Route path="success" element={<BookingSuccess />} />

                    <Route path="booking/:tripId" element={<BookingLayout />}>
                        <Route path="seats" element={<SelectSeats />} />
                        <Route path="passengers" element={<PassengerDetails />} />
                        <Route path="review" element={<BookingReview />} />
                    </Route>

                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>

                <Route path="/test-map" element={<TestMap />} />
            </Routes>
        </main>
    )
}

export default App
