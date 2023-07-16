# KnowledgeStore-server

KnowledgeStore-server is the backend server for the KnowledgeStore web application. It provides the necessary APIs and functionality to support user authentication, resource management, and data storage.

## Features

- **User Registration and Authentication**: Secure user registration and authentication to ensure access control and protect user data.
- **Resource Management**: Manage articles, tutorials, and educational content by enabling submission, retrieval, and categorization.
- **Database Integration**: Utilize MongoDB, a scalable NoSQL database, for efficient storage and retrieval of user information and resources.
- **API Endpoints**: Well-defined API endpoints for seamless communication with the frontend client to perform various actions.
- **Data Validation and Error Handling**: Robust data validation and error handling mechanisms ensure data integrity and provide meaningful feedback to the client.
- **Scalability and Performance**: Designed for scalability to handle a growing user base and increasing resource submissions while maintaining optimal performance.

## Application Routes:

## Main part:

### Auth (User)

- Route: https://knowledge-store-server.vercel.app/api/v1/auth/signup (POST)
- Route: https://knowledge-store-server.vercel.app/api/v1/auth/login (POST)
- Route: https://knowledge-store-server.vercel.app/api/v1/auth/refresh-token (POST)

### User

- Route: https://knowledge-store-server.vercel.app/api/v1/users/wishlist/add (POST)
- Route: https://knowledge-store-server.vercel.app/api/v1/users/reading-list/add (POST)
- Route: https://knowledge-store-server.vercel.app/api/v1/users/reading-list/finish (POST)
- Route: https://knowledge-store-server.vercel.app/api/v1/users/wishlist (GET)
- Route: https://knowledge-store-server.vercel.app/api/v1/users/reading-list (GET)
- Route: https://knowledge-store-server.vercel.app/api/v1/users/finish-list (GET)

### Books

- Route: https://knowledge-store-server.vercel.app/api/v1/books?limit=30 (GET)
- Route: https://knowledge-store-server.vercel.app/api/v1/books/64b3d5a9958f9834783e5803 (GET)
- Route: https://knowledge-store-server.vercel.app/api/v1/books/add-book (POST)
- Route: https://knowledge-store-server.vercel.app/api/v1/books/add-review/64b3d5a9958f9834783e5803 (PATCH)
- Route: https://knowledge-store-server.vercel.app/api/v1/books/64b3d5a9958f9834783e5803 (PATCH)
- Route: https://knowledge-store-server.vercel.app/api/v1/books/64b3d5a9958f9834783e580d (DELETE)

## Technologies Used

- Node.js: A runtime environment for executing JavaScript code on the server.
- Express: A minimal and flexible web application framework for Node.js that provides a robust set of features for web and API development.
- MongoDB: A popular NoSQL database for storing and retrieving data.
- Mongoose: An Object-Document Mapping (ODM) library for MongoDB, providing a higher-level abstraction for interacting with the database.
- JWT (JSON Web Tokens): A secure way of transmitting information between parties as JSON objects, commonly used for authentication purposes.
