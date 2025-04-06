import React from 'react';
import Sidebar from './Sidebar';

const LearningPath = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Learning Path</h1>
        {/* Add learning path content here */}
        <p>Explore courses and skill development tracks</p>
      </div>
    </div>
  );
};

export default LearningPath;