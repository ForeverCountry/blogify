# Blogify API

Blogify API is a backend service for managing users and posts in a blog application. It provides endpoints for user authentication, profile management, and CRUD operations for blog posts.

## Getting Started

To get started with using the Blogify API, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account (or a local MongoDB instance)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/honorifia/blogify.git
    ```

2. Install dependencies:

    ```bash
    cd api
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory of the project and define the following variables:

    ```
    PORT=4000
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    ```

    Replace `your_jwt_secret` with your preferred JWT secret key and `your_mongodb_connection_string` with your MongoDB connection string.

4. Start the server:

    ```bash
    npm run dev
    ```

## Usage

### Authentication Endpoints

#### Register a New User

```bash
curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
```

### Login a User
```
curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}' -c cookies.txt
```

### Get User profile
```
curl -X GET http://localhost:4000/auth/profile -b cookies.txt

```

### Logout a User
```
curl -X POST http://localhost:4000/auth/logout -b cookies.txt
```

## Post Endpoints
### Create a Post
```
curl -X POST http://localhost:4000/posts -H "Content-Type: multipart/form-data" -F "file=@/path/to/your/file.jpg" -F "title=Sample Title" -F "summary=Sample Summary" -F "content=Sample Content" -b cookies.txt
```

### Update a Post
```
curl -X PUT http://localhost:4000/posts \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/your/file.jpg" \
     -F "id=<post_id>" \
     -F "title=Updated Title" \
     -F "summary=Updated Summary" \
     -F "content=Updated Content" \
     -b cookies.txt

```

### Get All posts
```
curl -X GET http://localhost:4000/posts
```

### Get a Specific Post by ID
```
curl -X GET http://localhost:4000/posts/<post_id>
```
