# Use a lightweight Python image
FROM python:3.12

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy necessary files and directories into the container
COPY main.py .

# Expose the port that FastAPI will use
EXPOSE 5001

# Set the command to run your FastAPI app using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5001", "--reload"]
