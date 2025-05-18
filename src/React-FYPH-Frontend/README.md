# React-FYPH-Frontend

## Project Overview
React-FYPH-Frontend is a React-based application designed for managing rooms in a hospitality setting. The application allows users to view, add, and manage room details through a user-friendly interface.

## Features
- **Room Management**: Users can view a list of rooms, including details such as name, type, capacity, description, and price.
- **Add Room**: Users with appropriate roles can add new rooms using a form that captures all necessary details.
- **Responsive Design**: The application is designed to be responsive and user-friendly across various devices.

## File Structure
```
React-FYPH-Frontend
├── src
│   ├── components
│   │   └── room
│   │       └── RoomAdd.jsx
│   ├── pages
│   │   └── room
│   │       └── RoomAdd.jsx
│   ├── services
│   │   └── api.jsx
│   ├── shared
│   │   └── hooks
│   │       ├── useRoom.jsx
│   │       └── useRoomAdd.jsx
│   └── App.jsx
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd React-FYPH-Frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm start
```
This will launch the application in your default web browser.

## API Integration
The application interacts with a backend API to manage room data. Ensure that the backend server is running and accessible at the specified base URL.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.