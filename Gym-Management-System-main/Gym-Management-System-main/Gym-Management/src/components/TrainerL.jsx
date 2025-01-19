import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainerManagerL = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({ id: '', trainerName: '', email: '', number: '' });
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAllTrainers();
  }, []);

  const fetchAllTrainers = async () => {
    const response = await axios.get('http://localhost:8085/trainers');
    setTrainers(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change: ${name} = ${value}`); // Debugging line
    setTrainer({ ...trainer, [name]: value });
  };

  const handleCreateTrainer = async () => {
    await axios.post('http://localhost:8085/trainers', trainer);
    fetchAllTrainers();
    setTrainer({ id: '', trainerName: '', email: '', number: '' });
    setSuccessMessage('Applied successfully'); // Set success message
  };

  const handleUpdateTrainer = async () => {
    await axios.put('http://localhost:8085/trainers', trainer);
    fetchAllTrainers();
    setTrainer({ id: '', trainerName: '', email: '', number: '' });
    setSuccessMessage('Updated successfully'); // Set success message for update
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-80 mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Elevate Your Career</h1>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-center">Join as a Trainer</h2>
          <input
            type="text"
            name="trainerName"
            placeholder="Enter Your Name"
            value={trainer.trainerName}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={trainer.email}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="text"
            name="number"
            placeholder="Enter Your Phone Number"
            value={trainer.number}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            onClick={selectedTrainerId ? handleUpdateTrainer : handleCreateTrainer}
            className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-500"
          >
            {selectedTrainerId ? 'Update Trainer' : 'Apply now'}
          </button>
          <div className='p-2'>
  <a href="/" className='w-full'>
    <button className='w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-500'>
      Back
    </button>
  </a>
</div>

          {successMessage && (
            <div className="mt-4 text-black text-center">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerManagerL;
