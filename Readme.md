# Task Management Application

## Description

The Task Management Application is a web-based tool that allows users to create, edit, delete, and manage their tasks efficiently. The application is built using FastAPI for the backend and utilizes a lightweight database (SQLite) for storage.

## Technologies Used

- **Backend**: FastAPI
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript

## Installation Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rakshithalijol123/Task-Management.git
   cd Task-Management

**Create a Virtual Environment**
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

**Install Dependencies**
pip install -r requirements.txt

**Start the FastAPI Server**
uvicorn app.main:app --reload

 - The application will run at http://localhost:8000

**Access the Application**
 - Navigate to http://127.0.0.1:5501


## Challenges Faced
CORS Issues: Initially, there were CORS policy errors when trying to fetch data from the FastAPI backend. This was resolved by using the fastapi.middleware.cors middleware to allow requests from the frontend origin.

Validation Errors: Encountered validation errors while sending responses. This was solved by ensuring that the response data structure matched what the Pydantic models expected.

