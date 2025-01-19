import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import '../../styles/member.css';

// Component to handle marking attendance
const MarkCheckIn = () => {
    // State variables to manage form and member data
    const [memberId, setMemberId] = useState('');
    const [member, setMember] = useState(null);
    const [date, setDate] = useState('');
    const [memberName, setMemberName] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [error, setError] = useState('');

    // Function to search for a member by ID
    const handleSearch = async () => {
        try {

            const response = await axios.get(`http://localhost:8082/members/${memberId}`);

            if (response.data) {

                const memberData = response.data;
                setMember(memberData);
                setMemberName(memberData.membername);
                setError('');


                const now = new Date();
                const formattedTime = now.toTimeString().split(' ')[0];
                setCheckInTime(formattedTime);


                const today = new Date().toISOString().split('T')[0];
                setDate(today);
            } else {

                setError('Member not found');
                setMember(null);
                setMemberName('');
                setCheckInTime('');
            }
        } catch (error) {

            setError('Error fetching member');
            setMember(null);
            setMemberName('');
            setCheckInTime('');
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();


        const attendanceData = {
            memberId: member?.id || memberId,
            date,
            memberName,
            checkInTime
        };

        try {

            const response = await axios.post('http://localhost:8081/add_attendance', attendanceData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {

                alert('Check-in time marked successfully!');
                setMemberId('');
                setMember(null);
                setMemberName('');
                setCheckInTime('');
                setDate('');
            } else {

                alert('Failed to mark check-in time.');
            }
        } catch (error) {

            console.error('Error adding attendance:', error);
            alert('Failed to mark check-in time.');
        }
    };

    return (
        <div className="add-member-container">
            <div className="content--header">
                <h1 className="header--title">Mark Check-In</h1>
                <div className="header--activity">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by Member ID..."
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            onBlur={handleSearch}
                        />
                        <BiSearch className="icon" onClick={handleSearch} /> {/* Search icon */}
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                </div>
            </div>

            <h2>Member Check-In</h2>
            <form onSubmit={handleSubmit} className="add-member-form">
                <div className="form-group">
                    <label htmlFor="memberId">Member ID</label>
                    <input
                        type="text"
                        id="memberId"
                        value={member?.id || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="memberName">Member Name</label>
                    <input
                        type="text"
                        id="memberName"
                        value={memberName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkInTime">Check-In Time</label>
                    <input
                        type="text"
                        id="checkInTime"
                        value={checkInTime}
                        readOnly
                    />
                </div>
                <button type="submit" className="submit-btn">Check-In</button>
            </form>
        </div>
    );
};

export default MarkCheckIn;
