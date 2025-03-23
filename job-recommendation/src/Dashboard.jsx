import React from 'react';

const ResumeUpload = ({ onUpload, resumeUploaded, fileName }) => {
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Upload Your Resume</h2>
      <div className="flex items-center">
        <label className="relative cursor-pointer bg-gray-50 border rounded px-4 py-2 mr-4">
          <span className="text-gray-600">{fileName || 'Choose file...'}</span>
          <input 
            type="file" 
            className="sr-only" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </label>
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded"
          onClick={() => document.querySelector('input[type=file]').click()}
        >
          {resumeUploaded ? 'Update' : 'Upload'}
        </button>
        {resumeUploaded && (
          <span className="ml-4 text-green-600">✓ Uploaded</span>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
