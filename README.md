# My First MERN Full Stack App!

Welcome to my first MERN (MongoDB, Express.js, React.js, Node.js) full-stack application!

In this project, I have built a simple Todo application where users can add, edit, and delete tasks. The frontend is built using React.js, and the backend is powered by Node.js and Express.js, with MongoDB as the database.

## Features

- Add new todos
- Edit existing todos
- Delete todos
- Fetch todos using SWR (React Hooks for data fetching)
- Simple and intuitive user interface

## Technologies Used

- MongoDB: A NoSQL database used for storing todo data.
- Express.js: A web application framework for Node.js used for building the backend REST API.
- React.js: A JavaScript library used for building the user interface.
- Node.js: A JavaScript runtime used for building the backend server.
- SWR: React Hooks library for data fetching.
- Axios: A promise-based HTTP client for making requests to the backend API.

## How to Run

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:
    ```
    npm install
    ```
4. Set up your MongoDB connection string in a `.env` file at the root of your project. Example:
    ```
    MONGODB_URI=mongodb://localhost:27017/mydatabase
    ```
5. Start the backend server:
    ```
    npm start
    ```
6. Navigate to the `client` directory:
    ```
    cd client
    ```
7. Install frontend dependencies:
    ```
    npm install
    ```
8. Start the frontend development server:
    ```
    npm start
    ```
9. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Contributing

This project is open-source, and contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for details.
