import React from 'react';
import Sidebar from './Sidebar';

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        {/* Add settings content here */}
        <p>Manage your account preferences</p>
      </div>
    </div>
  );
};

export default Settings;