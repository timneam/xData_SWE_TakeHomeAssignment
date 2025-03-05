import { render, screen } from "@testing-library/react";
import TranscriptionTable from "../features/transcription_table";

test("renders transcription table", () => {
    render(<TranscriptionTable transcriptions={[]} />);
    expect(screen.getByText("Transcriptions")).toBeInTheDocument();
    });

    test("renders transcription data correctly", () => {
    const mockTranscriptions = [
        { file_name: "audio1.mp3", transcription: "Hello world", created: "2025-03-04" },
    ];
    render(<TranscriptionTable transcriptions={mockTranscriptions} />);

    expect(screen.getByText("audio1.mp3")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByText("2025-03-04")).toBeInTheDocument();
});
