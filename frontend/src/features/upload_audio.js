import { useState, useRef } from "react";
import axios from "axios";

// Upload audio feature to upload audio file to database
const UploadAudio = ({ fetchData }) => {
    const [file, setFile] = useState(null); // set use state to store the file
    const [isUploading, setIsUploading] = useState(false); // State to track upload status
    const fileInputRef = useRef(null); // Reference for file input

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

        setIsUploading(true); // Start loading spinner

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

        // Clear input field after uploading
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }

        // Catch error if upload fails
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false); // Stop loading spinner
        }
    };

    // Design upload audio feature to display when called
    return (
        <div className="mb-4">
            <h4>Upload Audio</h4>
            <div className="d-flex align-items-center">
                {/* only allow audio files using the accept parameter */}
                <input
                    ref={fileInputRef} 
                    data-testid="file"
                    type="file"
                    accept="audio/*" 
                    className="form-control mr-2"
                    onChange={handleFileChange}
                    disabled={isUploading} 
                />
                <button 
                    className="btn btn-primary d-flex align-items-center" 
                    onClick={uploadAudio} 
                    disabled={!file || isUploading}
                >
                    {isUploading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Uploading...
                        </>
                    ) : (
                        "Upload"
                    )}
                </button>
            </div>
        </div>
    );
};

export default UploadAudio;
