# Netflix Clone

This project is a Netflix clone built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides movie trailers based on categories fetched from the TMDB movies database using APIs, with a user authentication system. Users can add movie trailers to their watchlist to watch later and search between these trailers.

## Features

- View movie trailers based on categories (blockbuster, horror, trending, etc.)
- User authentication system (signup, login, logout)
- Add movie trailers to watchlist
- Search for movie trailers

## Technologies Used

- MongoDB: Database to store movie and user information
- Express.js: Web framework for Node.js to handle API requests
- React.js: Frontend library for building user interfaces
- Node.js: JavaScript runtime environment for server-side logic
- TMDB API: To fetch movie information and trailers

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/usama739/Netflix-clone.git
    cd Netflix-clone
    ```

2. **Install server dependencies**:
    ```bash
    cd netflix-backend
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd ../netflix-ui
    npm install
    ```

## Setup

1. Create a `.env` file in the `netflix-ui` directory and add your TMDB API key:
     ```env
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
     ```

## Running the Application

1. **Start the backend server**:
    ```bash
    cd netflix-backend
    nodemon server.js
    ```

2. **Start the frontend server**:
    ```bash
    cd ../netflix-ui
    npm start
    ```

3. **Open your browser** and navigate to `http://localhost:3000`.

## Usage
- Sign up for an account or log in if you already have one.
- Browse movie categories and click on a movie to watch its trailer.
- Use the search bar to search for specific movies.
- Click on the 'Add to Watchlist' button to add a movie to your watchlist.
