from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from contextlib import asynccontextmanager
import uvicorn
import sqlite3
import torch
from starlette.middleware.cors import CORSMiddleware
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa
import io
from datetime import datetime
import pytz

# Load Whisper model
MODEL_NAME = "openai/whisper-tiny"
processor = WhisperProcessor.from_pretrained(MODEL_NAME)
model = WhisperForConditionalGeneration.from_pretrained(MODEL_NAME)

# Define Singapore Timezone
SGT = pytz.timezone("Asia/Singapore")

# Database setup function
# Create a connection to SQLite Database
# Create a cursor object to execute SQL queries
# Create a table called transcriptions if it does not exist in the database
def init_db():
    conn = sqlite3.connect("transcriptions.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transcriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT,
            transcribed_text TEXT,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Lifespan event handler
# Initialize the database when application starts
# Close the database connection when application stops
# Print statements to indicate the current state of the application
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing database...")
    init_db()
    print("Initialisation completed.")
    yield  # Application is running
    print("Shutting down application...")

# Initialize FastAPI with lifespan handler
app = FastAPI(lifespan=lifespan)

# API endpoint to check the status of the service
@app.get("/health")
def health():
    return {"status": "Healthy"}

# API endpoint to upload an audio file and transcribe it
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        # Read audio file
        audio_data, sr = librosa.load(io.BytesIO(await file.read()), sr=16000)

        # Convert to input tensor
        input_features = processor(audio_data, sampling_rate=16000, return_tensors="pt").input_features

        # Generate transcription using the openai/whisper-tiny model from hugging face
        with torch.no_grad():
            predicted_ids = model.generate(input_features)
        transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

        # Get current time in Singapore Time (SGT)
        created_at = datetime.now(SGT).strftime("%Y-%m-%d %H:%M:%S")

        # Store in DB the file name and the transcription
        conn = sqlite3.connect("transcriptions.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO transcriptions (file_name, transcribed_text, created) VALUES (?, ?, ?)",
                       (file.filename, transcription, created_at))
        conn.commit()
        conn.close()

        # Return file name and transcription
        return {"file_name": file.filename, "transcription": transcription, "created": created_at}

    # Handle exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API endpoint to get all transcriptions
@app.get("/transcriptions")
def get_transcriptions():
    conn = sqlite3.connect("transcriptions.db")
    cursor = conn.cursor()
    cursor.execute("SELECT file_name, transcribed_text, created FROM transcriptions ORDER BY created DESC")
    data = cursor.fetchall()
    conn.close()

    return [{"file_name": row[0], "transcription": row[1], "created": row[2]} for row in data]

# API endpoint to search for one transription by file name based on a search query
@app.get("/search")
async def search(searchQuery: str = Query(...)):
    try:
        # Search for the file names matching the search query
        conn = sqlite3.connect("transcriptions.db")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM transcriptions WHERE file_name LIKE ?", ('%' + searchQuery + '%',))
        results = cursor.fetchall()
        conn.close()

        # Return the matching transcriptions
        transcriptions = [{"file_name": row[0], "transcription": row[1], "created": row[2]} for row in results]
        return transcriptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Run the server using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)