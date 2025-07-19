
import React from 'react';
import { Upload } from 'lucide-react';


const FileUploadComponent = () => {

    const fetchPDF = async (formData) => {
        const response = await fetch('http://localhost:3000/upload/file', {
          method: 'POST',
          body:formData
        })
        const data = await response.json();
        console.log(data);
      }

      const handleFileUpload = () => {
        console.log('File uploaded');
        const e = document.createElement('input');
        e.type = 'file';
        e.accept = '.pdf';
        e.onchange =  (e) => {
          if(e.target.files[0] ){
            console.log(e.target.files[0]);
            const file = e.target.files[0];
            console.log(file);
            if(file){
              const formData = new FormData();
              formData.append('file', file);
              fetchPDF(formData);
            }
          }
        }
        e.click();
      }

  return (
    <div className="bg-slate-900 text-white shadow-2xl flex justify-center items-center p-4 rounded-lg border-white border-2 cursor-pointer">
      <div
        onClick={handleFileUpload}
        className="flex justify-center items-center flex-col"
      >
        <h3>Upload PDF File</h3>
        <Upload />
      </div>
    </div>
  );
};

export default FileUploadComponent;
