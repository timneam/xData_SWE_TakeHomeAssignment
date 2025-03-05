# HTX xData Technical Test – Software Engineer

## Introduction
This repository contains my implementation of the HTX xData Technical Test (2024) – Software Engineer. The purpose of this test is to demonstrate my technical ability in developing a full-stack application that performs speech-to-text transcription using the Whisper-Tiny model from Hugging Face.

## Project Structure
The project consists of two main components:

### Backend (FastAPI)
A RESTful API that processes audio file uploads, performs transcription, stores results in an SQLite database, and provides search functionality.

### Frontend (React)
A single-page application that allows users to upload audio files, view transcriptions, and search by file name.

### Additional
Additionally, the entire application is containerized using Docker, and unit tests are included for both the backend and frontend.

## How to run project in docker
Ensure that you are in the same directory as **docker-compose.yml** file

Run the command below
```bash
docker-compose up --build
```