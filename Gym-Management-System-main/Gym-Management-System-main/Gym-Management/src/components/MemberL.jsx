import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberManagerL = () => {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({ id: '', membername: '', age: '', phonenumber: '', email: '', membertype: '' });
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const fetchAllMembers = async () => {
    const response = await axios.get('http://localhost:8082/members');
    setMembers(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleCreateMember = async () => {
    const response = await axios.post('http://localhost:8082/members', member);
    const newMemberId = response.data.id; // Assuming the response contains the new member's ID
    setSuccessMessage(`Registration Successful! Your ID is ${newMemberId}`);
    fetchAllMembers();
    setMember({ id: '', membername: '', age: '', phonenumber: '', email: '', membertype: '' });
  };

  const handleUpdateMember = async () => {
    await axios.put(`http://localhost:8082/members/${selectedMemberId}`, member);
    setSuccessMessage(`Member Updated Successfully!`);
    fetchAllMembers();
    setMember({ id: '', membername: '', age: '', phonenumber: '', email: '', membertype: '' });
    setSelectedMemberId(null); // Clear the selected member ID after update
  };

  return (
    <div className="w-80 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl mb-6 text-center font-extrabold">Join Our Community</h1>

      <div className="mb-4">
        <h2 className="text-md font-semibold mb-4 text-center">Start Your Fitness Journey</h2>
        <input
          type="text"
          name="membername"
          placeholder="Enter Your Name"
          value={member.membername}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="age"
          placeholder="What's Your Age?"
          value={member.age}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="Enter Your Phone Number"
          value={member.phonenumber}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={member.email}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
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
        <button
          onClick={selectedMemberId ? handleUpdateMember : handleCreateMember}
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-500 transition duration-200 rounded-lg"
        >
          {selectedMemberId ? 'Update Member' : 'Join Now'}
        </button>
        {successMessage && (
          <p className="mt-4 text-black text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default MemberManagerL;
