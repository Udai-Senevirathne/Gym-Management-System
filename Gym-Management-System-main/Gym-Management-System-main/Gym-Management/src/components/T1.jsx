import React, { useState, useEffect } from 'react';
import axios from 'axios';


const T1 = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({ id: '', trainerName: '', email: '', number: '' });
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllTrainers();
  }, []);

  const fetchAllTrainers = async () => {
    const response = await axios.get('http://localhost:8085/trainers');
    setTrainers(response.data);
  };

  const fetchTrainerById = async (id) => {
    const response = await axios.get(`http://localhost:8085/trainers/${id}`);
    setTrainer(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainer({ ...trainer, [name]: value });
  };

  const handleCreateTrainer = async () => {
    const response = await axios.post('http://localhost:8085/trainers', trainer);
    setTrainers([...trainers, response.data]);
    setMessage(`New Trainer Added. Trainer ID: ${response.data.id}`);
    setTrainer({ id: '', trainerName: '', email: '', number: '' });
  };

  return (
    <div className="p-1 absolute top-14 right-12">
      
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">{message}</div>}

      <div className="flex space-x-6">

        {/* Right Section */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Search Trainer GYMEX</h2>
            <input
              type="number"
              placeholder="Enter Trainer ID"
              value={selectedTrainerId || ''}
              onChange={(e) => setSelectedTrainerId(e.target.value)}
              className="p-2 border rounded mb-2"
            />
            <button
              onClick={() => fetchTrainerById(selectedTrainerId)}
              className="p-2 bg-black text-white rounded hover:bg-gray-500"
            >
              Fetch Trainer
            </button>

            {trainer.id && (
              <div className="mt-4 p-4 border rounded">
                <p><strong>ID:</strong> {trainer.id}</p>
                <p><strong>Name:</strong> {trainer.trainerName}</p>
                <p><strong>Email:</strong> {trainer.email}</p>
                <p><strong>Number:</strong> {trainer.number}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">GYMEX Trainers</h2>
            <ul className="list-disc pl-5">
              {trainers.map((t) => (
                <li key={t.id} className="mb-2">
                  {t.id} - {t.trainerName} - {t.email} - {t.number}
                  <div className="mt-2">
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

export default T1;
