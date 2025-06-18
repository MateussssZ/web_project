# Next.js SQLite Articles App

This is a simple web application built with Next.js, React, TypeScript, and SQLite3. The application allows users to create, edit, and view articles in a minimalist interface.

## Features

- Create new articles
- Edit existing articles
- View a list of all articles
- Simple and clean user interface

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **SQLite3**: A lightweight database engine for storing articles.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd nextjs-sqlite-articles-app
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Usage

- To create a new article, navigate to the "New Article" page.
- Fill out the form and submit to save the article.
- You can view all articles on the main page and click on any article to edit it.

## API Endpoints

- `GET /api/articles`: Retrieve a list of articles.
- `POST /api/articles`: Create a new article.
- `GET /api/articles/:id`: Retrieve a single article by ID.
- `PUT /api/articles/:id`: Update an existing article by ID.
- `DELETE /api/articles/:id`: Delete an article by ID.

## License

This project is licensed under the MIT License.