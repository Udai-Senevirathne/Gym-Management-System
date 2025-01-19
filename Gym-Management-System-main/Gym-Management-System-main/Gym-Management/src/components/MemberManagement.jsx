import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberManager = () => {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({ id: '', membername: '', age: '', phonenumber: '', email: '', membertype: '' });
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const fetchAllMembers = async () => {
    const response = await axios.get('http://localhost:8082/members');
    setMembers(response.data);
  };

  const fetchMemberById = async (id) => {
    const response = await axios.get(`http://localhost:8082/members/${id}`);
    setMember(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleCreateMember = async () => {
    const response = await axios.post('http://localhost:8082/members', member);
    setMembers([...members, response.data]);
    setMessage(`New GYMEX Member Added. Member ID: ${response.data.id}`);
    setMember({ id: '', membername: '', age: '', phonenumber: '', email: '', membertype: '' });
  };

  const handleUpdateMember = async () => {
    await axios.put(`http://localhost:8082/members/${selectedMemberId}`, member);
    fetchAllMembers();
    setMessage('Update successful');
    setMember({ id: '', membername: '', age: '', phonenumber: '', email: '', membertype: '' });
  };

  const handleDeleteMember = async (id) => {
    await axios.delete(`http://localhost:8082/members/${id}`);
    fetchAllMembers();
    setMessage('Member Drop Out');
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">GYMEX Member Board</h1>
      
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">{message}</div>}

      <div className="flex space-x-6">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">New Member for GYMEX</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              name="membername"
              placeholder="Enter Member Name"
              value={member.membername}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="age"
              placeholder="Enter Member's Age"
              value={member.age}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="phonenumber"
              placeholder="Enter Member's Phone Number"
              value={member.phonenumber}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Member's Email"
              value={member.email}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <select
          name="membertype"
          value={member.membertype}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded "
        >
          <option value="">Select Member Type</option>
          <option value="Premium">Premium</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select>
          </div>
          <button
            onClick={selectedMemberId ? handleUpdateMember : handleCreateMember}
            className="p-2 bg-black text-white rounded-lg hover:bg-gray-500"
          >
            {selectedMemberId ? 'Update Member' : 'Add Member'}
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Search Member GYMEX</h2>
            <input
              type="number"
              placeholder="Enter Member ID"
              value={selectedMemberId || ''}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="p-2 border rounded mb-2"
            />
            <button
              onClick={() => fetchMemberById(selectedMemberId)}
              className="p-2 bg-black text-white rounded hover:bg-gray-500 rounded-lg"
            >
              Fetch Member
            </button>

            {member.id && (
              <div className="mt-4 p-4 border rounded">
                <p><strong>ID:</strong> {member.id}</p>
                <p><strong>Name:</strong> {member.membername}</p>
                <p><strong>Age:</strong> {member.age}</p>
                <p><strong>Phone:</strong> {member.phonenumber}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Type:</strong> {member.membertype}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">GYMEX Members</h2>
            <ul className="list-disc pl-5">
              {members.map((m) => (
                <li key={m.id} className="mb-2">
                  {m.id} - {m.membername} - {m.age} - {m.phonenumber} - {m.email} - {m.membertype}
                  <div className="mt-2">
                    <button
                      onClick={() => fetchMemberById(m.id)}
                      className="p-1 bg-black text-white rounded-lg hover:bg-gray-500 mr-2"
                    >
                      Update Details
                    </button>
                    <button
                      onClick={() => handleDeleteMember(m.id)}
                      className="p-1 bg-red-700 text-white rounded-lg hover:bg-gray-500"
                    >
                      Drop Out
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberManager;
