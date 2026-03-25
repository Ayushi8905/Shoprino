# Shoprino - E-Commerce Cart Fusion

Shoprino is a modern, responsive e-commerce frontend application built with React, TypeScript, and Vite. It features a complete shopping cart experience, product browsing, state management, and a beautiful user interface using shadcn-ui and Tailwind CSS.

## 🚀 Features

- **Product Catalog:** Browse products across various categories (Food, Toiletries, Stationery, Clothing, Grains).
- **Shopping Cart:** Add, remove, and update the quantity of items in the cart.
- **Dynamic Pricing:** Automatic calculation of subtotals, GST (5%), and total prices.
- **Coupons & Discounts:** Apply discount codes directly in the cart context (e.g., `SHOPRINO10`, `WELCOME20`).
- **User Authentication (Mock):** A simple authentication layer allowing users to log in and register.
- **Responsive Design:** A fully mobile-friendly and accessible user interface.
- **Undo History:** Ability to undo recent cart actions.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18, Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn-ui, Radix UI UI Primitives, Lucide Icons
- **State Management:** Zustand (Products), React Context API + `useReducer` (Cart & Auth)
- **Routing:** React Router DOM

## 💻 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayushi8905/Shoprino.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Shoprino
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application Locally

Start the Vite development server:
```bash
npm run dev
```

The application will start, and you can view it in your browser (usually at `http://localhost:8080` or `http://localhost:5173`).

### Building for Production

To build the project for production deployment:
```bash
npm run build
```
The compiled, minified assets will be available in the `dist/` directory.

## 📁 Project Structure

- `src/components/`: Reusable React components (UI elements, layout components).
- `src/context/`: React Contexts (`CartContext.tsx`, `AuthContext.tsx`, `ThemeContext.tsx`).
- `src/lib/data.ts`: Mock static data representing categories, products, and available coupons.
- `src/pages/`: Main application routing pages.
- `src/store/`: Zustand stores for global state (e.g., `productStore.ts`).
- `src/utils/`: Utility functions and helper methods.
- `src/assets/`: Static assets such as images and fonts.

