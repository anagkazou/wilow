# Wilow Assessment - Ad Spend Dashboard

This project is a technical assessment demonstrating a performant, server-rendered dashboard using Next.js 16 (App Router) and React Server Components.

## 🚀 Features & Architecture

### **Server-Side Rendering (SSR) & Performance**
- **React Server Components (RSC):** The main `Dashboard` and data fetching logic reside on the server, reducing the client-side bundle size.
- **Streaming & Suspense:** The dashboard uses `React.Suspense` to instantly render the page layout while streaming the chart data in parallel. A spinner fallback is shown during the initial load and subsequent filter changes.
- **No Client-Side Data Fetching Libraries:** Dependencies like `@tanstack/react-query` were removed in favor of native Next.js/React patterns (`fetch`, `async/await` in Server Components), simplifying the architecture.

### **Data Fetching Strategy**
- **Simulation API:** A Next.js Route Handler (`/api/ad-spend`) simulates a real backend with an artificial delay (1s) to demonstrate loading states.
- **URL-Driven State:** Filter state (e.g., `?period=this_month`) is managed via URL Search Params. This ensures the dashboard is shareable and bookmarkable.
- **Dynamic Fetching:** The `Home` page fetches data dynamically based on the URL params, passing the promise to the `Dashboard` component to handle resolution.

### **Component Reusability**
- **`ChartComponent`:** A generic, reusable client component wrapper around `Recharts` that handles the rendering of the chart, tooltips, legends, and the filter UI.
- **`Dashboard`:** A Server Component that orchestrates the data and configuration for specific charts (like the Ad Spend Chart).

### **Tech Stack**
- **Framework:** Next.js 16.1.4 (App Router)
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts (via `shadcn/ui` patterns)
- **Icons:** Lucide React
- **Theming:** `next-themes` (Dark/Light mode support)

## 🛠️ Getting Started

First, install dependencies:

```bash
yarn install
# or
npm install
```

Run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/page.tsx`: Main entry point. Fetches data and suspends the Dashboard.
- `src/app/api/ad-spend/route.ts`: Mock API route.
- `src/components/dashboard.tsx`: Server Component that orchestrates specific charts.
- `src/components/chart-card.tsx`: Generic Client Component for charts.
- `src/components/ui`: Reusable UI components (shadcn/ui).

