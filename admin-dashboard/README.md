# Admin Dashboard

This project is an admin dashboard for managing articles in a web application. It allows administrators to view, edit, and delete articles stored in a SQLite database.

## Project Structure

The project is organized as follows:

```
admin-dashboard
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   └── articles.controller.ts # Controller for article CRUD operations
│   ├── routes                # Defines the routes for the application
│   │   └── articles.routes.ts # Routes for article management
│   ├── db                   # Database connection and query functions
│   │   └── index.ts          # Database connection and article queries
│   ├── middleware            # Middleware functions for authentication
│   │   └── auth.ts           # Authentication middleware
│   ├── types                 # Type definitions for the application
│   │   └── index.ts          # Type definitions including Article interface
│   └── views                 # React components for the admin dashboard
│       ├── Dashboard.tsx     # Main dashboard component
│       ├── ArticleEdit.tsx   # Component for editing articles
│       └── ArticleList.tsx    # Component for listing articles
├── Dockerfile                 # Dockerfile for building the application image
├── docker-compose.yml         # Docker Compose configuration
├── package.json               # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build and run the application using Docker:**
   ```bash
   docker-compose up --build
   ```

4. **Access the admin dashboard:**
   Open your browser and navigate to `http://localhost:<port>` (replace `<port>` with the port specified in your `docker-compose.yml`).

## Usage

- **Viewing Articles:** Navigate to the article list to view all articles.
- **Editing Articles:** Click on an article to edit its details.
- **Deleting Articles:** Use the delete option to remove an article from the list.

## License

This project is licensed under the MIT License.