# Advanced React E-Commerce

A modern e-commerce application built with React, TypeScript, Redux Toolkit, and Firebase, featuring user authentication, product management, shopping cart functionality, and order history.

## 🚀 Features

### Authentication & User Management
- **User Registration**: Create new accounts with email and password using Firebase Authentication
- **User Login/Logout**: Secure authentication with Firebase Auth
- **User Profile Management**: 
  - View and edit user profile information (name, email, address)
  - Update password
  - Delete account with password confirmation
- **User Data Storage**: User profiles stored in Firestore with automatic document creation on registration

### Product Catalog
- **Product Listing**: Browse all products stored in Firestore with details including title, price, category, description, and images
- **Category Navigation**: Dynamic dropdown that fetches categories and filters products by selected category
- **Product Management**: Create, read, update, and delete products in Firestore
- **Image Fallback**: Automatic placeholder image display when product images fail to load (handles 404 errors gracefully)

### Shopping Cart
- **Add to Cart**: Add products directly from the product listing page
- **Cart Management**: View, update quantities, and remove items from the shopping cart
- **Persistent Storage**: Shopping cart data persists across browser sessions using sessionStorage
- **Real-time Updates**: Dynamic calculation and display of total items and total price
- **Checkout**: Place orders that are stored in Firestore, with cart clearing and visual feedback

### Order Management
- **Order Creation**: Orders are automatically created in Firestore when users checkout
- **Order History**: View a complete list of all previous orders
- **Order Details**: Click on individual orders to view full details including products, quantities, totals, and creation date
- **User-Specific Orders**: Orders are filtered to show only the current user's order history

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React Query (TanStack Query)** for data fetching and caching
- **Firebase** (Authentication & Firestore) for backend services
- **React Router** for navigation
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

3. **Firebase Setup** (Required):
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable Firebase Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase configuration and update `src/firebaseConfig.ts` with your credentials
   - Set up Firestore security rules as needed for your use case

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

## 🗂️ Application Routes

- `/` - Home page with product catalog and shopping cart
- `/user-profile` - User profile management (edit profile, change password, delete account)
- `/orders` - Order history page

## 📡 Data Sources

### Firebase Firestore Collections
- **`products`**: Stores all product data (replaces FakeStore API)
- **`users`**: Stores user profile information
- **`orders`**: Stores order history with product details and user associations

### External API
- **Categories**: Still fetched from [FakeStore API](https://fakestoreapi.com/products/categories) for category list

## 📝 Notes

- Products are stored in Firestore and can be managed through the application
- Shopping cart data is stored in `sessionStorage` and persists across page refreshes within the same browser session
- Orders are permanently stored in Firestore and associated with the user who placed them
- User authentication is required to access the application - users must register or login to view products and place orders
- Product images may return 404 errors. The application automatically displays placeholder images when this occurs

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
