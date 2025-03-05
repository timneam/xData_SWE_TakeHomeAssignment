import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../features/search"
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Search Component", () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test("renders search input field", () => {
        render(<Search setTranscriptions={jest.fn()} fetchData={jest.fn()} />);
        expect(screen.getByPlaceholderText("Search for files")).toBeInTheDocument();
    });

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
