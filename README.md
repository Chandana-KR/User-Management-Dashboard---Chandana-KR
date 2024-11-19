This is a simple React application for managing a list of users. It includes features like adding a new user, editing user information, and validating the user's data. The form validation checks that each user must have a valid First Name, Last Name, and Email. This project is structured with a focus on reusable components, modular code, and clean state management.

Table of Contents
   1. Project Setup
   2. Directory Structure
   3. Components
   4. Challenges Faced
   5. Potential Improvements


Project Setup
    To set up and run this project locally, follow these steps:

Prerequisites
    Node.js: Ensure that Node.js is installed on your system. You can download it from Node.js.
    npm or yarn: Package manager (comes with Node.js).

Installation Steps

1. Clone the repository:
    git clone https://github.com/Chandana-KR/User-Management-Dashboard---Chandana-KR.git

2. Navigate into the project directory:
   cd user-management 

3. Install dependencies:
    npm install

4. Run the application:
    npm start

5. Open the application in your browser: Go to http://localhost:3000
 

Components
    1. UserList Component (UserList.js)
        Purpose: Handles the list of users and manages the state for adding, editing, and deleting users.
        Functionality:
        Displays a list of users.
        Allows the selection of a user for editing.
        Handles user deletion.
        Integrates the UserForm component to facilitate adding and editing user details.

    2. UserForm Component (UserForm.js)
        Purpose: A form component to add or edit user details.
        Functionality:
        Takes firstName, lastName, email, and department as inputs.
        Validates firstName, lastName, and email to ensure they are not empty and the email is in the correct format.
        Displays error messages when validation fails.
        Calls appropriate functions from Home.js to save or update user data.

Potential Improvements
    Error Handling:
        Implement more advanced error handling, such as displaying tooltips or using a notification library for form errors.
        Consider adding animations for error display to improve user experience.

    Form Enhancements:
        Add additional form fields (like phone number or address) with proper validation.
        Use a form management library like Formik or react-hook-form to simplify form state handling and validation.
        
    Data Persistence:
        Integrate a backend (e.g., Node.js + Express) to handle user data and make the application persistent with a database (e.g., MongoDB).
        Use REST API or GraphQL for managing CRUD operations server-side.
