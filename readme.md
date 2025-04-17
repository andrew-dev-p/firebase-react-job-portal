# Description

This is a **Job Portal Application** built with **React**, **TypeScript**, **Vite**, and **Firebase**, offering a complete platform for job seekers and employers. It features job browsing, application submission, profile management, and administrative tools — all within a modern, interactive UI.

## Features

- **User Authentication**: Secure login and registration powered by **Firebase Auth**.
- **Profile Management**: Users can update **personal info**, **education**, and **experience** through a tabbed profile interface.
- **Job Listings CRUD**: Admins can **create**, **update**, and **delete** job posts, while users can **apply** for jobs directly.
- **Job Applications**: Users can **submit applications**, and see jobs they've applied to.
- **Admin Dashboard**: Admin pages for reviewing job listings and user submissions.
- **Approved Jobs Feed**: Home page displays only **approved job posts**.
- **Responsive Layout**: Fully responsive and user-friendly **Ant Design** components.
- **Collapsible Sidebar**: Optimized navigation with a sleek collapsible sidebar.
- **Toast Notifications**: Real-time user feedback using **React Toastify**.
- **Protected Routes**: Separation of public and authenticated areas via **React Router**.
- **Loading State Management**: Seamless transitions with centralized loading state.

## Technologies Used

- **React**: For building interactive user interfaces.
- **TypeScript**: To add type safety and improve developer experience.
- **Vite**: A lightning-fast build tool and development server.
- **Firebase**: Backend services including **Firestore**, **Auth**, and **Storage**.
- **Redux Toolkit**: For simplified and efficient state management.
- **Ant Design (AntD)**: A modern UI library for fast prototyping and polished visuals.
- **React Router DOM**: For client-side routing and navigation.
- **Moment.js**: For formatting dates and timestamps.
- **Crypto-JS**: For simple encryption needs.
- **React Toastify**: Clean and customizable toast notifications.

## Installation

To set up the app locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/andrew-dev-p/firebase-react-job-portal.git
cd firebase-react-job-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env.local` file in the root directory with your **Firebase project credentials**:

```bash
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

## Running the App

To run the app in development mode:

```bash
npm run dev
```

This will start the development server, typically on [http://localhost:5173](http://localhost:5173).

## Build for Production

To build the project:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```
