// Transcription Table feature is to display the transcription in a table format
// This feature is called in main component App.js
// Takes in transcriptions as props and maps through the transcriptions to display in a table
const TranscriptionTable = ({ transcriptions }) => {
    return (
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
            {transcriptions.map((item, index) => (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.file_name}</td>
                <td>{item.transcription}</td>
                <td>{item.created}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default TranscriptionTable;
