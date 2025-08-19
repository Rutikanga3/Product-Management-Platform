import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct, deleteProduct } from '../app/api';
import type { Product } from '../types/product';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';


export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<Product>>({});

    useEffect(() => {
        console.log('ProductDetails mounted with ID:', id);
        if (id) {
            fetchProductData(parseInt(id));
        } else {
            setError('No product ID provided');
            setLoading(false);
        }
    }, [id]);

    const fetchProductData = async (productId: number) => {
        try {
            setLoading(true);
            setError(null); 

            console.log('Fetching product with ID:', productId);
            const response = await fetchProductById(productId);
            console.log('Product response:', response);

            setProduct(response.data);
            setEditForm(response.data);
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Failed to fetch product details. Please check the console for more information.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm(product || {});
    };

    const handleSave = async () => {
        if (!product || !id) return;

        try {
            setLoading(true);
            const updateResponse = await updateProduct(parseInt(id), editForm);
            console.log('Updated product:', updateResponse.data);

            setProduct({ ...product, ...editForm });
            setIsEditing(false);
            setError(null);

            
            alert(`Product "${editForm.title || product.title}" updated successfully! (Note: This is a mock API - changes won't persist on the server)`);
        } catch (err) {
            setError('Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;

        const confirmed = window.confirm('Are you sure you want to delete this product? This action cannot be undone.');

        if (confirmed) {
            try {
                setLoading(true);
                setError(null); 

                console.log('Attempting to delete product with ID:', id);
                const response = await deleteProduct(parseInt(id));
                console.log('Delete response:', response);

                
                if (response.data && response.data.isDeleted) {
                    alert(`Product "${product?.title}" has been deleted successfully! (Note: This is a mock API - the product still exists on the server)`);
                    navigate('/products');
                } else {
                    alert('Delete operation completed, but the product may still appear in the list (mock API behavior)');
                    navigate('/products');
                }
            } catch (err) {
                console.error('Delete error:', err);
                setError('Failed to delete product. Please try again.');
                setLoading(false);
            }
        }
    };

    const handleInputChange = (field: keyof Product, value: any) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!product) return <ErrorMessage message="Product not found" />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6">


                <div className="bg-white rounded-lg shadow-md p-6">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditing ? 'Edit Product' : product.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {!isEditing ? (
                                <>
                                    <Button label="Edit" onClick={handleEdit} />
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Button label="Save" onClick={handleSave} />
                                    <Button label="Cancel" onClick={handleCancel} />
                                </>
                            )}
                        </div>
                    </div>

                    
                    <div className="mb-6">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-100 justify-center h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                        />
                    </div>
                    {/* <div>
                        <img src={product.images[0]} alt={product.title}  className='h-40 w-auto rounded border border-teal-400 '/>
                    </div> */}
                    <div className='flex gap-6 justify-center'>
                        {product.images.map((image:string, index:number) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.title} image ${index + 1}`}
                                className="h-40 w-auto rounded border border-teal-400 mb-2"
                            />

                        ))}
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.title || ''}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{product.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                {isEditing ? (
                                    <textarea
                                        value={editForm.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{product.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.category || ''}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{product.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.brand || ''}
                                        onChange={(e) => handleInputChange('brand', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{product.brand}</p>
                                )}
                            </div>
                        </div>

                        {/* Pricing and Stock */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Pricing & Stock</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 ">Price</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editForm.price || ''}
                                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 "
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900 bg-teal-100 w-15 rounded-md p-1">${product.price}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editForm.discountPercentage || ''}
                                        onChange={(e) => handleInputChange('discountPercentage', parseFloat(e.target.value))}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p className="mt-1 text-white bg-red-400 w-15 rounded-md p-1">{product.discountPercentage}%</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editForm.stock || ''}
                                        onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{product.stock} units</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rating</label>
                                <p className="mt-1 text-gray-900">{product.rating}/5 ⭐</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SKU</label>
                                <p className="mt-1 text-gray-900">{product.sku}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Weight</label>
                                <p className="mt-1 text-gray-900 bg-yellow-200 w-15 rounded-md p-1">{product.weight}g</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Warranty</label>
                                <p className="mt-1 text-gray-900">{product.warrantyInformation}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Information</label>
                                <p className="mt-1 text-gray-900">{product.shippingInformation}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Return Policy</label>
                                <p className="mt-1 text-gray-900">{product.returnPolicy}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Minimum Order Quantity</label>
                                <p className="mt-1 text-gray-900 bg-green-300 w-15 rounded-md p-1">{product.minimumOrderQuantity}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Availability</label>
                                <p className="mt-1 text-gray-900">{product.availabilityStatus}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tags</label>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Button label="← Back to Products" onClick={() => navigate('/products')} />
                    </div>
                </div>
            </div>
        </div>
    );
}
