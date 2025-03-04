import axios from "axios";

// Search feature to search for transcription based on file name
const Search = ({ setTranscriptions, fetchData }) => {

    // search function to search for transcription based on file name
    const search = async (e) => {

        // set search query to the value entered in search input
        const searchQuery = e.target.value;

        // if search query is empty, fetch all transcriptions
        if (searchQuery === "") {
            fetchData();
        }

        // If search query length is greater than 2, search for transcription
        if (searchQuery.length > 2) {
            try {
                const response = await axios.get("http://localhost:5001/search", {
                params: { searchQuery },
                });
                setTranscriptions(response.data);
                } catch (error) {
                    console.log("Search error:", error);
                }
        }
    };

    // Design search feature to display when called
    return (
        <div className="mb-4">
        <h4>Search Transcriptions</h4>
        <input
            type="text"
            placeholder="Search for files"
            className="form-control"
            onChange={search}
        />
        </div>
    );
};

export default Search;
