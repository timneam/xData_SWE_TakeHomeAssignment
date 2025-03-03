import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <div className="App container">
      {/* Header */}
      <h1 className="text-center my-4">Audio Translator</h1>

      {/* Upload Section */}
      <div className="mb-4">
        <h4>Upload Audio</h4>
        <div className="d-flex align-items-center">
          <input
            type="file"
            accept="audio/*"
            className="form-control mr-2"
          />
          <button className="btn btn-primary">Upload</button>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-4">
        <h4>Search Transcriptions</h4>
        <input
          type="text"
          placeholder="Search for files"
          className="form-control"
        />
      </div>

      {/* Audio List */}
      <div className="mb-4">
        <h4>Transcriptions</h4>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">File Name</th>
              <th scope="col">Transcription</th>
              <th scope="col">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Data */}
            <tr>
              <th scope="row">1</th>
              <td>Audio_1.wav</td>
              <td>This is the transcription text for Audio 1.</td>
              <td>2025-03-03</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Audio_2.mp3</td>
              <td>This is the transcription text for Audio 2.</td>
              <td>2025-03-02</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Audio_3.wav</td>
              <td>This is the transcription text for Audio 3.</td>
              <td>2025-03-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
