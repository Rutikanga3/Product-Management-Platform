# Product Management System

A modern React TypeScript application for managing products with full CRUD operations and category filtering.

## Features

### 🛍️ Product Management
- **View Products**: Browse all products in a responsive grid layout
- **Product Details**: Click on any product to view detailed information
- **Edit Products**: Modify product information directly from the details page
- **Delete Products**: Remove products with confirmation dialog
- **Add New Products**: Create new products with a comprehensive form

### 🔍 Search & Filter
- **Search Products**: Find products by name using the search bar
- **Category Filtering**: Filter products by category using the dropdown
- **Real-time Results**: See results count and updates instantly

### 🎨 User Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: User-friendly error messages

## API Integration

The application uses the DummyJSON API for product data:
- Fetch all products
- Get product by ID
- Update product information
- Delete products
- Search products
- Get categories
- Filter products by category

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## Usage Guide

### Viewing Products
- The main page shows all products in a grid
- Each product card displays: image, title, brand, category, price, rating, and stock status
- Click on any product card to view detailed information

### Adding a New Product
1. Click the "Add New Product" button
2. Fill in the required fields:
   - Title
   - Description
   - Price
   - Category (select from dropdown)
   - Brand
   - Stock quantity
3. Click "Save Product" to create the product

### Editing a Product
1. Navigate to the product details page
2. Click the "Edit" button
3. Modify the fields you want to change
4. Click "Save" to update the product
5. Click "Cancel" to discard changes

### Deleting a Product
1. Go to the product details page
2. Click the "Delete" button
3. Confirm the deletion in the popup dialog

### Searching and Filtering
- **Search**: Type in the search bar to find products by name
- **Category Filter**: Use the dropdown to filter products by category
- **Combined**: Search and category filters work together

## Technical Details

### Tech Stack
- **React 19** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Project Structure
```
src/
├── app/
│   └── api.ts              # API functions
├── components/
│   ├── Button.tsx          # Reusable button component
│   ├── ErrorMessage.tsx    # Error display component
│   ├── Loader.tsx          # Loading spinner
│   ├── Navbar.tsx          # Navigation bar
│   └── ProductCard.tsx     # Product card component
├── pages/
│   ├── ProductList.tsx     # Main products page
│   └── ProductDetails.tsx  # Product details/edit page
├── types/
│   └── product.ts          # TypeScript interfaces
└── App.tsx                 # Main app component
```

### Key Components Explained

#### ProductList.tsx
- Main page that displays all products
- Handles search and category filtering
- Includes form for adding new products
- Manages loading and error states

#### ProductDetails.tsx
- Shows detailed product information
- Provides inline editing functionality
- Handles product updates and deletion
- Responsive layout for all product data

#### ProductCard.tsx
- Reusable card component for product display
- Shows key product information at a glance
- Includes hover effects and click handling

## API Endpoints Used

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /products/search?q=:query` - Search products
- `GET /products/categories` - Get all categories
- `GET /products/category/:category` - Get products by category
- `POST /products/add` - Create new product

## Future Enhancements

- Image upload functionality
- Bulk operations (delete multiple products)
- Advanced filtering (price range, rating, etc.)
- Product reviews and ratings
- Export/import functionality
- User authentication and authorization
