import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import '../../styles/table.css';

const RemoveAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                try {
                    const url = `http://localhost:8081/search_attendance/?memberId=${searchQuery}`;
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.length > 0) {
                        setAttendanceData(data);
                        setMessage('');
                    } else {
                        setAttendanceData([]);
                        setMessage('No data available for the given Member ID');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setMessage('Error fetching data. Please try again later.');
                }
            } else {
                setAttendanceData([]);
                setMessage('Please search for a Member ID to delete attendance.');
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle the "Delete" button click
    const handleDeleteClick = async (id, memberName, date) => {
        try {
            const response = await fetch(`http://localhost:8081/delete_attendance/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {

                const updatedData = attendanceData.filter((item) => item.id !== id);
                setAttendanceData(updatedData);

                alert(`${memberName}'s ${date} attendance deleted successfully!`);
            } else {
                console.error('Failed to delete data');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="view-attendance-container">
            <div className="content--header">
                <h1 className="header--title">Remove Attendance</h1>
                <div className="header--activity">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by Member ID..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <BiSearch className="icon" />
                    </div>
                </div>
            </div>

            {message && <div className="message">{message}</div>}

            {attendanceData.length > 0 && !message ? (
                <table className="attendance-table">
                    <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Date</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {attendanceData.map((attendance) => (
                        <tr key={attendance.id}>
                            <td>{attendance.memberId}</td>
                            <td>{attendance.memberName}</td>
                            <td>{new Date(attendance.date).toISOString().split('T')[0]}</td>
                            <td>{attendance.checkInTime}</td>
                            <td>{attendance.checkOutTime}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteClick(attendance.id, attendance.memberName, attendance.date)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default RemoveAttendance;

