import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import '../../styles/table.css';


const ManageAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editRowIndex, setEditRowIndex] = useState(null); // To track the row being edited
    const [editableData, setEditableData] = useState({}); // To store editable data for the row
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
                        setMessage(''); // Clear message when data is found
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
                setMessage('Please search for a Member ID to manage attendance.');
            }
        };


        fetchData();
    }, [searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle the "Edit" button click
    const handleEditClick = (index) => {
        setEditRowIndex(index);
        setEditableData({ ...attendanceData[index] });
    };

    // Function to handle the changes in input fields during edit
    const handleInputChange = (event, field) => {
        const { value } = event.target;
        setEditableData({ ...editableData, [field]: value });
    };

    // Function to handle the "Submit" button click
    const handleSubmitClick = async () => {
        try {
            const response = await fetch('http://localhost:8081/edit_attendance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editableData.id,
                    memberId: editableData.memberId,
                    memberName: editableData.memberName,
                    date: editableData.date,
                    checkInTime: editableData.checkInTime,
                    checkOutTime: editableData.checkOutTime,
                }),
            });

            if (response.ok) {
                // Update the local state with the edited data
                const updatedData = [...attendanceData];
                updatedData[editRowIndex] = editableData;
                setAttendanceData(updatedData);
                setEditRowIndex(null);
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="view-attendance-container">
            <div className="content--header">
                <h1 className="header--title">Manage Attendance</h1>
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
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {attendanceData.map((attendance, index) => (
                        <tr key={attendance.id}>
                            <td>
                                {editRowIndex === index ? (
                                    <input
                                        type="text"
                                        value={editableData.memberId}
                                        onChange={(e) => handleInputChange(e, 'memberId')}
                                    />
                                ) : (
                                    attendance.memberId
                                )}
                            </td>
                            <td>
                                {editRowIndex === index ? (
                                    <input
                                        type="text"
                                        value={editableData.memberName}
                                        onChange={(e) => handleInputChange(e, 'memberName')}
                                    />
                                ) : (
                                    attendance.memberName
                                )}
                            </td>
                            <td>
                                {editRowIndex === index ? (
                                    <input
                                        type="date"
                                        value={editableData.date || ''}
                                        onChange={(e) => handleInputChange(e, 'date')}
                                    />
                                ) : (
                                    new Date(attendance.date).toISOString().split('T')[0]
                                )}
                            </td>
                            <td>
                                {editRowIndex === index ? (
                                    <input
                                        type="time"
                                        value={editableData.checkInTime || ''}
                                        onChange={(e) => handleInputChange(e, 'checkInTime')}
                                    />
                                ) : (
                                    attendance.checkInTime
                                )}
                            </td>
                            <td>
                                {editRowIndex === index ? (
                                    <input
                                        type="time"
                                        value={editableData.checkOutTime || ''}
                                        onChange={(e) => handleInputChange(e, 'checkOutTime')}
                                    />
                                ) : (
                                    attendance.checkOutTime
                                )}
                            </td>
                            <td>
                                {editRowIndex === index ? (
                                    <button className="submit-button" onClick={handleSubmitClick}>
                                        Submit
                                    </button>
                                ) : (
                                    <button className="edit-button" onClick={() => handleEditClick(index)}>
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default ManageAttendance;
