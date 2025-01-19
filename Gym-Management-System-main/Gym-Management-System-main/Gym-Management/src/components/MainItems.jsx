import React from 'react';
import M1 from './M1.jsx';
import T1 from './T1.jsx';

const MainItems = () => {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <M1 />
      </div>
      <div className="flex-1">
        <T1 />
      </div>
      
    </div>
  );
};

export default MainItems;
