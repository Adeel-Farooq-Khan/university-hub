

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend API (MongoDB Auth + Posts)

This repo now includes a small Express API under `server/` that:

- Authenticates **Teacher** and **Student** users from MongoDB (no signup UI)
- Allows **teachers** to create announcements (saved to MongoDB)
- Allows authenticated users to read announcements

### Setup env files

This workspace blocks committing `.env` files, so templates are provided instead:

- Copy `server/env.example` → `server/.env`
- Copy `env.example` → `.env`

Then edit `server/.env`:

- **MONGODB_URI**: your MongoDB Atlas URI
- **JWT_SECRET**: set a long random secret
- **PORT**: defaults to `5000`

### Seed 1 teacher + 1 student (optional)

The API needs users in MongoDB. You can either insert users manually in MongoDB Atlas, or run:

```sh
npm run seed:users
```

### Run frontend + backend

```sh
npm run dev:full
```

Frontend: `http://localhost:8080`  
API: `http://localhost:5000`

