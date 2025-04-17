CS Assignment Backend
This repository contains the source code for a backend application built to handle various functionalities, including authentication, agent management, and list operations. Below are the setup and execution instructions to get the application running on your local machine.
### Deliverables

Source Code for the Application: The complete backend code is included in this repository, organized into folders like routes, models, and files like server.js.
A README File with Setup and Execution Instructions: You're reading it! This file provides step-by-step guidance.

Setup Instructions
Prerequisites

Node.js (v14.x or later)
npm (comes with Node.js)
Git (for cloning the repository)
A code editor (e.g., VS Code)

Steps to Set Up

Clone the Repository:

Open your terminal and run:git clone https://github.com/Nishant-Sharma26/cs-assignment.git


Navigate to the project folder:cd cs-assignment




Install Dependencies:

Run the following command to install the required Node.js packages:npm install


This will create a node_modules folder with all dependencies (e.g., mongoose, multer).


Configure Environment Variables:

Create a .env file in the root directory.
Add the following variables (replace with your actual values):PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Note: Do not commit the .env file to Git. It’s already in .gitignore to keep it secure.


Verify File Structure:

Ensure the following files are present:
server.js
routes/agents.js
routes/auth.js
routes/lists.js
package.json
package-lock.json


Folders like config/, middleware/, and models/ contain additional logic.



Execution Instructions

Start the Application:

Run the following command to start the server:npm start


The application should now be running on http://localhost:3000 (or the port specified in .env).


Test the API:

Use a tool like Postman or curl to test the endpoints. For example:
Authentication: POST http://localhost:3000/auth/login
Agent Management: GET http://localhost:3000/agents
List Operations: POST http://localhost:3000/lists


Refer to the route files (routes/*.js) for specific endpoints and expected payloads.


Upload CSV (if applicable):

If your application uses UploadCSV.js, send a POST request to the upload endpoint with a CSV file. The uploads/ directory will temporarily store files (ignored by Git).



Troubleshooting

Server Not Starting: Check the terminal for errors (e.g., missing dependencies or invalid .env values). Run npm install again if needed.
Database Connection Issues: Ensure MONGO_URI in .env is correct and the MongoDB server is running.
Port Conflict: Change the PORT value in .env if 3000 is in use.

Additional Notes

This backend uses Express.js with Mongoose for MongoDB integration and Multer for file uploads.
Feel free to explore the code and modify it as needed for your assignment.
For any issues, you can reach out or check the GitHub Issues tab.

Happy coding! 
