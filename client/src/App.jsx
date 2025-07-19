import React from 'react';
import FileUploadComponent from './components/FileUpload';
import ChatComponent from './components/chat';

const Home = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row">
      <div className="w-full md:w-[30vw] h-[30vh] md:h-screen p-4 flex justify-center items-center border-b md:border-b-0 md:border-r">
        <FileUploadComponent />
      </div>
      <div className="w-full md:w-[70vw] h-[70vh] md:h-screen">
        <ChatComponent />
      </div>
    </div>
  );
};

export default Home;
