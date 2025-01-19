import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MaterialReactTable } from 'material-react-table';
import '../../styles/viewattendance.css'; // Import the CSS file

const ViewAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch all attendance data if searchQuery is empty
        const fetchData = async () => {
            try {
                const url = searchQuery
                     ? `http://localhost:8081/search_attendance/?memberId=${searchQuery}`
                    : 'http://localhost:8081/all_attendance';
                const res = await fetch(url);
                const result = await res.json();
                setAttendanceData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const columns = [
        {
            accessorKey: 'memberId',
            header: 'Member ID',
            size: 100,
        },
        {
            accessorKey: 'memberName',
            header: 'Member Name',
            size: 100,
        },
        {
            accessorKey: 'date',
            header: 'Date',
            size: 100,
        },
        {
            accessorKey: 'checkInTime',
            header: 'Check-In Time',
            size: 100,
        },
        {
            accessorKey: 'checkOutTime',
            header: 'Check-Out Time',
            size: 80,
        },
    ];

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="view-attendance-container">
            <div className="content--header">
                <h1 className="header--title">VIEW ATTENDANCE</h1>
                <div className="header--activity">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by Member ID..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <BiSearch className="icon" />
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <div className="table-container">
                    <MaterialReactTable
                        columns={columns}
                        data={attendanceData}
                        enableSearch={false}
                        enableFilters={false}
                        enableColumnActions={false}
                        enableDensityToggle={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewAttendance;
