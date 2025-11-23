# Vocab Learning Client

This is the frontend for the Vocab Learning application, built with React, Vite, and Tailwind CSS.

## Features

- View and add vocabulary to a list.
- Download the vocabulary list as an Excel file.
- Interactive quiz to test your knowledge.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- The backend server is running.

### Installation and Running

1.  **Clone the repository**

2.  **Navigate to the `client` directory:**
    ```sh
    cd client
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Environment Variables

To connect to a backend running on a different URL, create a `.env` file in the `client` directory and add the following variable:

```
# Example: VITE_API_URL=http://localhost:3001/api/vocab
VITE_API_URL=http://your-backend-url/api/vocab
```

If this variable is not set, the application will default to `http://localhost:3000/api/vocab`.
