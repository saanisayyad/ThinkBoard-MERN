# ThinkBoard 📝

A clean, full-stack note-taking application built with the **MERN stack**. ThinkBoard lets you create, view, edit, and delete notes through a polished React interface backed by an Express API and MongoDB.

## ✨ Features

- Create notes with a title and content
- View saved notes in a responsive card layout
- Edit existing notes
- Delete notes from the list or detail view
- Notes are sorted by most recently updated
- Loading states and empty-state UI
- Toast notifications for success and error feedback
- Client-side validation for required fields
- API rate-limiting support through Upstash packages
- Responsive dark UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS 4
- Lucide / Lucide React
- React Hot Toast

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- CORS
- Dotenv
- Upstash Redis
- Upstash Rate Limit

## 🏗️ Project Structure

```text
ThinkBoard-MERN/
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controller/   # Note CRUD logic
│   │   ├── models/       # Mongoose schemas
│   │   └── routes/       # API routes
│   └── server.js          # Express entry point
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── lib/          # Axios client and utilities
    │   ├── pages/        # Home, create, and note-detail pages
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/saanisayyad/ThinkBoard-MERN.git
cd ThinkBoard-MERN
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Start the backend in development mode:

```bash
npm run dev
```

Or run it normally:

```bash
npm start
```

The API is served from:

```text
http://localhost:3000/api
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

The frontend defaults to the local API above. To use a different backend URL, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## 🔌 API Endpoints

All note endpoints are mounted under `/api/note`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/note` | Get all notes |
| `GET` | `/api/note/:id` | Get a note by ID |
| `POST` | `/api/note` | Create a new note |
| `PUT` | `/api/note/:id` | Update a note |
| `DELETE` | `/api/note/:id` | Delete a note |

### Create note example

```json
{
  "title": "My first note",
  "content": "Ideas, reminders, and anything worth remembering."
}
```

## 🗃️ Data Model

Each note contains:

```text
Note
├── title   String   required
├── content String   required
├── createdAt        timestamp
└── updatedAt        timestamp
```

## 🖥️ Application Flow

1. The React frontend loads notes through Axios.
2. Requests are sent to the Express API under `/api/note`.
3. Express routes delegate CRUD operations to the note controller.
4. Mongoose stores and retrieves notes from MongoDB.
5. Changes are reflected in the React UI with toast feedback and navigation.

## 📜 Available Scripts

### Backend

```bash
npm run dev    # Start with nodemon
npm start      # Start the production server
```

### Frontend

```bash
npm run dev    # Start Vite development server
npm run build  # Create production build
npm run lint   # Run ESLint
npm run preview
```

## 🔐 Environment Variables

Do not commit secrets or database credentials to Git.

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string |
| `PORT` | No | Express server port; defaults to `3000` |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | No | API base URL; defaults to `http://localhost:3000/api` |

## 🔮 Future Improvements

Potential next steps include authentication, per-user notes, search and filtering, note categories/tags, pagination, richer editing, and deployment automation.

## 📄 License

This project currently uses the ISC license as declared by the backend package configuration.

---

Built with the MERN stack by **Mohammadsaani Sayyad**.
