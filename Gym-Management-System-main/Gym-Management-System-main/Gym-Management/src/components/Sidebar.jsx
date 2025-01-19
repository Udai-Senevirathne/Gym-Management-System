import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-screen w-64 bg-black text-white">
            <div className="p-4">
                <h1 className="text-xl font-bold">GYMEX</h1>
            </div>
            <nav className="mt-10">
                <Link to="/m1" className="block py-2.5 px-4 hover:bg-gray-500">
                    Dashboard
                </Link>
                <Link to="/member-manager" className="block py-2.5 px-4 hover:bg-gray-500">
                    Members
                </Link>
                <Link to="/trainer-manager" className="block py-2.5 px-4 hover:bg-gray-500">
                    Trainers
                </Link>
                <div>
                    <button
                        className="block py-2.5 px-4 hover:bg-gray-500 w-full text-left"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Attendance
                    </button>
                    {isOpen && (
                        <div className="pl-4">
                            <Link to="/view-attendance" className="block py-2.5 px-4 hover:bg-gray-500">
                                View Attendance
                            </Link>
                            <Link to="/mark-check-in" className="block py-2.5 px-4 hover:bg-gray-500">
                                Check-in Attendance
                            </Link>
                            <Link to="/mark-check-out" className="block py-2.5 px-4 hover:bg-gray-500">
                                Check-out Attendance
                            </Link>
                            <Link to="/manage-attendance" className="block py-2.5 px-4 hover:bg-gray-500">
                                Manage Attendance
                            </Link>
                            <Link to="/remove-attendance" className="block py-2.5 px-4 hover:bg-gray-500">
                                Remove Attendance
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
