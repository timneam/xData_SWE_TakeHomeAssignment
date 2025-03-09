import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../features/search"
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Search Component", () => {
    let mock;

    // Before each test cases, create a mock instance for axios
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    // Restore axios back to its original state after each tests
    afterEach(() => {
        mock.restore();
    });

    // Render the search component and then verify by expecting the search input field is present
    test("renders search input field", () => {
        render(<Search setTranscriptions={jest.fn()} fetchData={jest.fn()} />);
        expect(screen.getByPlaceholderText("Search for files")).toBeInTheDocument();
    });

    // Create a mock function to handle transcription update
    // Renger the search component
    // Mock the search API endpoint
    // Then enter something into the search component
    // Then wait and expect that a transaction has been updated
    test("search triggers API request", async () => {
        const mockSetTranscriptions = jest.fn();
        render(<Search setTranscriptions={mockSetTranscriptions} fetchData={jest.fn()} />);
        
        mock.onGet("http://localhost:5001/search", { params: { searchQuery: "test" } }).reply(200, [
        { file_name: "test_audio.mp3", transcription: "Hello World", created: "2025-03-04" },
        ]);

        const input = screen.getByPlaceholderText("Search for files");
        fireEvent.change(input, { target: { value: "test" } });

        await waitFor(() => {
            expect(mockSetTranscriptions).toHaveBeenCalled();
        })
    });
});
