import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import '../../styles/member.css';

// Component to handle marking attendance
const MarkCheckOut = () => {

    const [Id, setId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [member, setMember] = useState(null);
    const [date, setDate] = useState('');
    const [memberName, setMemberName] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [error, setError] = useState('');

    // Function to search for a member by ID
    const handleSearch = async () => {
        try {

            const response = await axios.get('http://localhost:8081/today/', {
                params: { memberId },
            });

            if (response.data.length > 0) {

                const memberData = response.data[0];
                setMember(memberData);
                setId(memberData.id);
                setMemberName(memberData.memberName);
                setError('');
                setCheckInTime(memberData.checkInTime);
                setDate(memberData.date);

                const now = new Date();
                const formattedTime = now.toTimeString().split(' ')[0];
                setCheckOutTime(formattedTime);

            } else {

                alert('Member is not found today, He is not check-in today or he is check-out today');
                setMember(null);
                setMemberName('');
                setCheckOutTime('');
            }
        } catch (error) {

            setError('Error fetching member');
            setMember(null);
            setMemberName('');
            setCheckOutTime('');
        }
    };

    // Function to handle form submission
    const handlePut = async (e) => {
        e.preventDefault();


        const attendanceData = {
            id: Id,
            memberId: member?.memberId || memberId,
            date,
            memberName,
            checkInTime,
            checkOutTime
        };

        try {

            const response = await axios.put('http://localhost:8081/edit_attendance', attendanceData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {

                alert('Check-Out time marked successfully!');
                setMemberId('');
                setMember(null);
                setMemberName('');
                setCheckOutTime('');
                setDate('');
            } else {

                alert('Failed to mark Check-Out time.');
            }
        } catch (error) {

            console.error('Error adding attendance:', error);
            alert('Failed to mark check-out time.');
        }
    };

    return (
        <div className="add-member-container">
            <div className="content--header">
                <h1 className="header--title">Mark Check-Out</h1>
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

            <h2>Member Check-Out</h2>
            <form onSubmit={handlePut} className="add-member-form">
                <div className="form-group">
                    <label htmlFor="memberId">Member ID</label>
                    <input
                        type="text"
                        id="memberId"
                        value={member?.memberId || ''}
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
                    <label htmlFor="checkOutTime">Check-Out Time</label>
                    <input
                        type="text"
                        id="checkOutTime"
                        value={checkOutTime}
                        readOnly
                    />
                </div>
                <button type="submit" className="submit-btn">Check-Out</button>
            </form>
        </div>
    );
};

export default MarkCheckOut;

