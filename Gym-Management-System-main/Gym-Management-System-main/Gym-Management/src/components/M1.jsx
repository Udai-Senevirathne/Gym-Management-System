import React, { useState, useEffect } from 'react';
import axios from 'axios';
import T1 from './T1.jsx';
import Assign from './Assign.jsx';

const M1 = () => {
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
      <h1 className="text-4xl font-bold mb-4">GYMEX Dashboard</h1>
      
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">{message}</div>}

      <div className="flex space-x-6">

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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <T1 />
      <Assign />
    </div>
  );
};

export default M1;
