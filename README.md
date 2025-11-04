# BaliCraft - Digital Gallery Landing Page

This project is a responsive landing page for "BaliCraft", a fictional high-end handicraft gallery. The primary goal is to act as a premium digital showcase to attract customers to the physical store. The site is fully dynamic, with all content managed through a Supabase backend.

## Key Features

*   **Dynamic Content:** Products, artisans, and categories are fetched asynchronously from a Supabase database.
*   **Category Filtering:** The collections page allows users to view all products or filter by a specific category (`/collections/:category`).
*   **Backend Integration:** The contact form is connected to the backend, storing user messages directly in the database.
*   **Modern Tech Stack:** Built with a modern, efficient, and scalable frontend stack.
*   **Interactive Map:** Features an embedded Google Maps iframe to display the gallery's location.

## Tech Stack

*   **Frontend:** React, Vite, TypeScript
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Backend:** Supabase (PostgreSQL Database, Storage, API)
*   **Routing:** React Router DOM

## Local Setup

To run this project on your local machine, follow these steps.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dimasherdian/Handicraft_Store.git
    cd Handicraft_Store
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create an environment file:**
    *   Create a file named `.env.local` in the project root.
    *   Add your Supabase credentials to this file. You can find them in your Supabase dashboard under `Settings > API`.
    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).
