from fastapi.testclient import TestClient
from main import app
import io

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "Healthy"}

def test_upload_audio():
    # Create a small valid WAV file for testing
    dummy_audio = io.BytesIO(
        b"RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00D\xac\x00\x00\x88X\x01\x00\x02\x00\x10\x00data\x00\x00\x00\x00"
    )

    files = {"file": ("test.wav", dummy_audio, "audio/wav")}  # Use WAV format
    response = client.post("/transcribe", files=files)

    print("Response:", response.json())  # Debugging output
    assert response.status_code == 200
    assert "file_name" in response.json()
    assert "transcription" in response.json()

def test_get_transcriptions():
    response = client.get("/transcriptions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)