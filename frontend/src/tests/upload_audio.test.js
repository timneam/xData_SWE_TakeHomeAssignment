import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadAudio from "../features/upload_audio";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Upload Audio Component", () => {
    let mock;

    // Before each test cases, mock an instance of axios
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    // Restore its original state after each test cases
    afterEach(() => {
        mock.restore();
    });

    // Render the upload audio file component
    // Should expect to get the upload audio text
    test("renders file input", () => {
        render(<UploadAudio fetchData={jest.fn()} />);
        expect(screen.getByText("Upload Audio")).toBeInTheDocument();
    });

    // Mock the function to fetchData
    // Render the Upload audio file component
    // Mock the API endpoint for file upload
    // Select the file and trigger a change event
    // Click upload button
    // Wait for API call and expect that the fetchData is called
    test("handles file upload", async () => {
        const mockFetchData = jest.fn();
        render(<UploadAudio fetchData={mockFetchData} />);

        mock.onPost("http://127.0.0.1:5001/transcribe").reply(200, { success: true });

        const file = new File(["dummy audio"], "test.mp3", { type: "audio/mpeg" });
        const input = screen.getByTestId("file");

        fireEvent.change(input, { target: { files: [file] } });

        const button = screen.getByText("Upload");
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockFetchData).toHaveBeenCalled();
        })
    });
});
