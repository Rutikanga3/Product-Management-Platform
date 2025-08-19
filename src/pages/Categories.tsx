import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchProductsByCategory } from '../app/api';
import type { Product } from '../types/product';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      setLoading(true);
      const response = await fetchCategories();
      setCategories(response.data || []);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category: string) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      const response = await fetchProductsByCategory(category);
      setProducts(response.data.products || []);
    } catch (err) {
      setError('Failed to fetch products for this category');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'Categories'}
          </h1>
          {selectedCategory && (
            <Button
              label="Back to Categories"
              onClick={handleBackToCategories}
              className="w-full sm:w-auto bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
            />
          )}
        </div>

        {!selectedCategory ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <p className="text-gray-600">Click to view products</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          <div>
            <div className="mb-6">
              {/* <p className="text-gray-600">
                Showing {products.length} product{products.length !== 1 ? 's' : ''} in {selectedCategory}
              </p> */}
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => navigate(`/products/${product.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

