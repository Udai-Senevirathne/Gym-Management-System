import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Assign = () => {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [message, setMessage] = useState('');
  const [member, setMember] = useState(null);
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    fetchAllMembers();
    fetchAllTrainers();
  }, []);

  const fetchAllMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8082/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMessage('Error fetching members.');
    }
  };

  const fetchAllTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:8085/trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      setMessage('Error fetching trainers.');
    }
  };

  const fetchMemberById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8082/members/${id}`);
      if (response.data) {
        setMember(response.data);
        setMessage(''); // Clear previous messages
        // Fetch trainer details if the member has a trainer assigned
        if (response.data.trainerId) {
          const trainerResponse = await axios.get(`http://localhost:8085/trainers/${response.data.trainerId}`);
          setTrainer(trainerResponse.data);
        } else {
          setTrainer(null);
        }
      } else {
        setMember(null);
        setTrainer(null);
        setMessage('Member not found.');
      }
    } catch (error) {
      console.error('Error fetching member:', error);
      setMember(null);
      setTrainer(null);
      setMessage('Member not found.');
    }
  };

  const assignTrainerToMember = async () => {
    if (!selectedMemberId || !selectedTrainerId) {
      setMessage('Please select both a member and a trainer.');
      return;
    }
    try {
      await axios.put(`http://localhost:8082/members/${selectedMemberId}/assign-trainer`, null, {
        params: { trainerId: selectedTrainerId }
      });
      setMessage('Trainer assigned successfully!');
      fetchMemberById(selectedMemberId); // Refresh member details
    } catch (error) {
      console.error('Error assigning trainer:', error);
      setMessage('Error assigning trainer.');
    }
  };

  const handleSearch = () => {
    if (!searchId) {
      setMessage('Please enter a member ID to search.');
      return;
    }
    fetchMemberById(searchId);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Assign Trainer to Member</h1>
      
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">{message}</div>}

      <div className="flex space-x-6">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Assign Trainer</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="">Select Member</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.membername}</option>
              ))}
            </select>
            <select
              value={selectedTrainerId}
              onChange={(e) => setSelectedTrainerId(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="">Select Trainer</option>
              {trainers.map(trainer => (
                <option key={trainer.id} value={trainer.id}>{trainer.trainerName}</option>
              ))}
            </select>
          </div>
          <button
            onClick={assignTrainerToMember}
            className="p-2 bg-black text-white rounded-lg hover:bg-gray-500"
          >
            Assign Trainer
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Search Member ID</h2>
          <input
            type="number"
            placeholder="Enter Member ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="p-2 border rounded mb-2"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-black text-white rounded hover:bg-gray-500"
          >
            Search
          </button>

          <h2 className="text-xl font-semibold mt-4 mb-2">Details</h2>
          {member ? (
            <div className="mt-4 p-4 border rounded">
              <p><strong>ID - </strong> {member.id}</p>
              <p><strong>Member Name - </strong> {member.membername}</p>
              
              <p><strong>Trainer Details - </strong>
{member.trainerId ? 
  (trainer 
    ? `Name: ${trainer.trainerName}, Email: ${trainer.email}, Phone: ${trainer.number}` 
    : 'Fetching trainer details...') 
  : 'No trainer assigned'}
</p>
            </div>
          ) : (
            searchId && <p>Member ID {searchId}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assign;
