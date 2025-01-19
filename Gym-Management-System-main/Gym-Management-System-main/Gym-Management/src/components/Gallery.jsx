import React from 'react';

const Gallery = () => {
  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-white '>
      <div className='w-10/12'>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <img className="h-auto max-w-full rounded-lg" src="./danielle-cerullo-CQfNt66ttZM-unsplash.jpg" alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src="./geert-pieters-3RnkZpDqsEI-unsplash.jpg" alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src="./scott-webb-Vn39uEkX00s-unsplash.jpg" alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src="./scott-webb-xwMlVSqP20U-unsplash.jpg" alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src="./sven-mieke-jO6vBWX9h9Y-unsplash.jpg" alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full rounded-lg" src="./arthur-edelmans-qfjuh4OLdxw-unsplash1111.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
