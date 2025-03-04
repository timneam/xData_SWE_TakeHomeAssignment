import { useState } from "react";
import axios from "axios";

// Upload audio feature to upload audio file to database
const UploadAudio = ({ fetchData }) => {
    // set use state to store the file
    const [file, setFile] = useState(null);

    // Set the file to selected file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload audio file to database
    const uploadAudio = async () => {
        // If file empty, print console log and return
        if (!file) {
            console.log("No file selected");
            return;
        }

        // Create form data and append file
        const formData = new FormData();
        formData.append("file", file);

        // Post request to upload file
        try {
            await axios.post("http://127.0.0.1:5001/transcribe", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    
        // Set file to null and fetch data
        fetchData();
        setFile(null);

        // Catch error if upload fails
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // Design upload audio feature to display when called
    return (
        <div className="mb-4">
            <h4>Upload Audio</h4>
            <div className="d-flex align-items-center">
            <input
                data-testid="file"
                type="file"
                accept="audio/*"
                className="form-control mr-2"
                onChange={handleFileChange}
            />
            <button className="btn btn-primary" onClick={uploadAudio} disabled={!file}>
                Upload
            </button>
            </div>
        </div>
    );
};

export default UploadAudio;
