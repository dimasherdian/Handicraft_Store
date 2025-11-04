# BaliCraft - A Curated Digital Gallery

This repository contains the source code for the BaliCraft website, a curated digital gallery for a high-end handicraft store based in Ubud, Bali. The primary business goal of this website is not e-commerce, but to act as a premium digital showcase to drive foot traffic to the physical gallery.

## Business Logic: Drive-to-Store

The core business strategy is to bridge the gap between talented local artisans and a premium market. For high-value, authentic handicrafts, customers prefer to see and touch the products before purchasing. This website serves to:

1.  **Curate & Showcase:** Present a curated selection of the finest handmade goods in a premium, artistic, and authentic digital environment.
2.  **Tell a Story:** Emphasize the value, story, and authenticity behind each piece and the artisan who created it.
3.  **Inspire a Visit:** Convince quality-conscious buyers (tourists, collectors, designers) to visit the physical gallery in Ubud, Bali.

## Features

*   **Dynamic Content:** All product and artisan data is managed through a Supabase backend, allowing for easy updates without changing the code.
*   **Category Filtering:** A dedicated collections page where users can view all products or filter by category (Wood, Silver, Textile).
*   **Featured Products:** A curated section on the main page to highlight specific items.
*   **Drive-to-Store CTA:** Buttons and sections are strategically designed to encourage users to visit the physical gallery.
*   **Contact Form with Purpose:** A contact form that captures user intent (e.g., general inquiry vs. scheduling a private visit).
*   **Embedded Google Maps:** An interactive map showing the gallery's location in Ubud.

## Tech Stack

*   **Frontend:** React, Vite, TypeScript
*   **Styling:** Tailwind CSS with shadcn/ui components
*   **Backend:** Supabase (PostgreSQL Database, Storage, and APIs)
*   **Routing:** React Router DOM

## Local Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dimasherdian/Handicraft_Store.git
    cd Handicraft_Store
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Supabase environment variables:**
    *   Create a new file named `.env.local` in the root of the project.
    *   Add your Supabase Project URL and Anon Key to this file. You can find these in your Supabase project dashboard under **Settings > API**.
    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Set up the Supabase database:**
    *   Log in to your Supabase dashboard.
    *   Go to the **SQL Editor**.
    *   Run the SQL scripts provided in the project to create and populate the necessary tables (`artisans`, `products`, `messages`).

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).
