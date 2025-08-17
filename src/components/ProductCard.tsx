import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Brand */}
        <p className="text-sm text-gray-600 mb-2">
          {product.brand}
        </p>

        {/* Category */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
          {product.category}
        </span>

        {/* Price and Rating */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex justify-between items-center">
          <span className={`text-sm px-2 py-1 rounded-full ${product.stock > 0
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>

          {/* Discount */}
          {product.discountPercentage > 0 && (
            <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
