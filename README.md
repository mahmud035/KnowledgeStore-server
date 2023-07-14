# # Cow Hut Admin Auth

## Project Overview

Cow Hut Admin Auth is a backend application that enables authorized users to manage a cow hut system. The project focuses on implementing user authentication and authorization using secure methods to protect sensitive information.

## Live Link: <a href="https://cow-hunt.vercel.app/"> https://cow-hunt.vercel.app/</a>

## Features

The Cow Hut Admin Auth project includes the following features:

- User registration and login: Users can register with the system and log in securely.
- Access control: Different user roles (e.g., admin, manager, employee) have different access privileges within the system.
- Password hashing: User passwords are securely hashed and stored to ensure data security.
- Token-based authentication: JSON Web Tokens (JWT) are used for user authentication and authorization.
- User management: Admins can manage user accounts, including creating, updating, and deleting user information.

## Application Routes:

## Main part:

### Auth (User)

- Route: https://cow-hunt.vercel.app/api/v1/auth/signup (POST)
- Route: https://cow-hunt.vercel.app/api/v1/auth/login (POST)
- Route: https://cow-hunt.vercel.app/api/v1/auth/refresh-token (POST)

### Auth (Admin)

- Route: https://cow-hunt.vercel.app/api/v1/admins/create-admin (POST)
- Route: https://cow-hunt.vercel.app/api/v1/admins/login (POST)

### User

- Route: https://cow-hunt.vercel.app/api/v1/users (GET)
- Route: https://cow-hunt.vercel.app/api/v1/users/64a2aba685a362779c2b6bec (Single GET) Include an id that is saved in database
- Route: https://cow-hunt.vercel.app/api/v1/users/64a2aba685a362779c2b6bec (PATCH)
- Route: https://cow-hunt.vercel.app/api/v1/users/648e7cc308a075f891021119 (DELETE) Include an id that is saved in database

### Cows

- Route: https://cow-hunt.vercel.app/api/v1/cows (POST)
- Route: https://cow-hunt.vercel.app/api/v1/cows (GET)
- Route: https://cow-hunt.vercel.app/api/v1/cows/64a2cbbece4e0b62761cf895 (Single GET) Include an id that is saved in database
- Route: https://cow-hunt.vercel.app/api/v1/cows/64a2cbbece4e0b62761cf895 (PATCH)
- Route: https://cow-hunt.vercel.app/api/v1/cows/648ea87f3b342420ebdb3ea9 (DELETE) Include an id that is saved in database

### Pagination and Filtering routes of Cows

- Route: https://cow-hunt.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
- Route: https://cow-hunt.vercel.app/api/v1/cows?minPrice=5000&maxPrice=60000
- Route: https://cow-hunt.vercel.app/api/v1/cows?page=1&limit=10
- Route: https://cow-hunt.vercel.app/api/v1/cows?location=Chattogram
- Route: https://cow-hunt.vercel.app/api/v1/cows?searchTerm=Cha
- Route: https://cow-hunt.vercel.app/api/v1/cows?searchTerm=Dha

### Orders

- Route: https://cow-hunt.vercel.app/api/v1/orders (POST)
- Route: https://cow-hunt.vercel.app/api/v1/orders (GET)

## Bonus Part:

### Admin

- Route: https://cow-hunt.vercel.app/api/v1/admins/create-admin (POST)

### My Profile

- Route: https://cow-hunt.vercel.app/api/v1/users/my-profile (GET)
- Route: https://cow-hunt.vercel.app/api/v1/users/my-profile (PATCH)

### Order:

- Route: https://cow-hunt.vercel.app/api/v1/orders/64a2e2f387e0e45e31392bc6 (GET)

## Usage

Once the project is set up and running, you can perform the following actions:

- Register a new user by providing the required information.
- Log in with your registered credentials to access the system.
- Manage user accounts if you have admin privileges.
- Perform authorized actions based on your user role.

## Technologies

The Cow Hut Admin Auth project utilizes the following technologies:

- Node.js: A JavaScript runtime environment
- Express.js: A web application framework for Node.js
- MongoDB: A NoSQL database for data storage
- Mongoose: An Object Data Modeling (ODM) library for MongoDB
- JSON Web Tokens (JWT): A method for securely transmitting information as a JSON object
- bcrypt.js: A library for hashing passwords

### Contact

For any questions or suggestions, please feel free to contact the project owner:

- Name: Mahmud
- GitHub: [mahmud035](https://github.com/mahmud035)
