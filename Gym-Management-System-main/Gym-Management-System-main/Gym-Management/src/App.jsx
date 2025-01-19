import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import TrainerManager from './components/TrainerManager.jsx';
import MemberManagement from './components/MemberManagement.jsx';
import MemberManagerL from './components/MemberL.jsx';
import TrainerManagerL from './components/TrainerL.jsx';
import Sidebar from './components/Sidebar.jsx';
import T1 from './components/T1.jsx';
import M1 from './components/M1.jsx';
import Assign from './components/Assign.jsx';
import ViewAttendance from "./components/attendance/ViewAttendance.jsx";
import MarkCheckIn from "./components/attendance/MarkCheckIn.jsx";
import MarkCheckOut from "./components/attendance/MarkCheckOut.jsx";
import RemoveAttendance from "./components/attendance/RemoveAttendance.jsx";
import ManageAttendance from "./components/attendance/ManageAttendance.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="flex">
                {isAuthenticated && <Sidebar />} {/* Show Sidebar only when authenticated */}
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Navigate to="/m1" /> : <LoginPage login={login} />}
                        />
                        <Route
                            path="/m1"
                            element={isAuthenticated ? <M1 /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/trainer-manager"
                            element={isAuthenticated ? <TrainerManager /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/member-manager"
                            element={isAuthenticated ? <MemberManagement /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/m1"
                            element={isAuthenticated ? <M1 /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/t1"
                            element={isAuthenticated ? <T1 /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/view-attendance"
                            element={isAuthenticated ? <ViewAttendance /> : <Navigate to="/login" />}
                        />


                        <Route
                            path="/mark-check-in"
                            element={isAuthenticated ? <MarkCheckIn /> : <Navigate to="/login" />}
                        />

                        <Route
                            path="/mark-check-out"
                            element={isAuthenticated ? <MarkCheckOut /> : <Navigate to="/login" />}
                        />

                        <Route
                            path="/remove-attendance"
                            element={isAuthenticated ? <RemoveAttendance /> : <Navigate to="/login" />}
                        />

                        <Route
                            path="/manage-attendance"
                            element={isAuthenticated ? <ManageAttendance /> : <Navigate to="/login" />}
                        />

                        <Route path="/member-manager-l" element={<MemberManagerL />} />
                        <Route path="/apply-trainer" element={<TrainerManagerL />} />
                        <Route path="/assign" element={<Assign />} />


                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
