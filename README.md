# Advanced React E-Commerce

A modern e-commerce application built with React, TypeScript, and Redux Toolkit, featuring product catalog browsing, category filtering, and shopping cart functionality.

## 🚀 Features

### Product Catalog
- **Product Listing**: Browse all products with details including title, price, category, description, rating, and images
- **Category Navigation**: Dynamic dropdown that fetches categories from the API and filters products by selected category
- **Image Fallback**: Automatic placeholder image display when product images fail to load (handles 404 errors gracefully)

### Shopping Cart
- **Add to Cart**: Add products directly from the product listing page
- **Cart Management**: View, update quantities, and remove items from the shopping cart
- **Persistent Storage**: Shopping cart data persists across browser sessions using sessionStorage
- **Real-time Updates**: Dynamic calculation and display of total items and total price
- **Checkout**: Simulated checkout process that clears the cart and provides visual feedback

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React Query (TanStack Query)** for data fetching and caching
- **React Bootstrap** for UI components
- **Axios** for HTTP requests

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd advanced-react-ecommerce
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📡 API

This application uses the [FakeStore API](https://fakestoreapi.com/) for product data:

- **All Products**: `GET https://fakestoreapi.com/products`
- **All Categories**: `GET https://fakestoreapi.com/products/categories`
- **Products by Category**: `GET https://fakestoreapi.com/products/category/{category}`

## 📝 Notes

- Some image URLs from the FakeStore API may return 404 errors. The application automatically displays placeholder images when this occurs.
- Shopping cart data is stored in `sessionStorage` and persists across page refreshes within the same browser session.
- The checkout process is simulated (FakeStore API doesn't support order processing) and clears the cart state.

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
