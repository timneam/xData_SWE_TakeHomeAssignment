import "bootstrap/dist/css/bootstrap.css"; // I used bootstrap for styling
import "./App.css";
import axios from "axios"; // Axios is used for http requests to the python backend
import { useEffect, useState } from "react";

// Imported the features from the features folder
// I have created a separate folder called features and added these features in it
// This helps to make the code more modular and easy to understand and maintain
// This also allows to reuse these features in other components if needed
import Search from "../src/features/search";
import TranscriptionTable from "../src/features/transcription_table";
import UploadAudio from "../src/features/upload_audio";

function App() {
  // use state to store the transcriptions for the table
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // function to fetch the transcriptions from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/transcriptions");
      setTranscriptions(response.data);
      setLoading(false); // Set loading to false once data is available
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch the transcriptions from backend when component mounts
  // Polling effect to continuously check for data every 3 seconds
  useEffect(() => {
    fetchData(); 

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  // return the main component
  // I called the 3 features into this main component from the features folder
  // Allow for easy layout and readability
  return (
    <div className="App container">
      <h1 className="text-center my-4">Audio Translator</h1>
      <UploadAudio fetchData={fetchData} />
      <Search setTranscriptions={setTranscriptions} fetchData={fetchData} />
        {/* Show loading message until data is available */}
        {loading ? (
            <div>
            <p>Loading transcriptions...</p>
          </div>
        ) : 
        <TranscriptionTable transcriptions={transcriptions} />
      }    
    </div>
  );
}

export default App;
