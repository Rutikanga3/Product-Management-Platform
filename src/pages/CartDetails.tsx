import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import { fetchCartById, updateCart, deleteCart } from '../app/api';
import type { Cart } from '../types/cart';

export default function CartDetails() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [productId, setProductId] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(1);
    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError('');
                if (!id) throw new Error('No cart id');
                const { data } = await fetchCartById(parseInt(id));
                setCart(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load cart');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            setSaving(true);
            setError('');
            await updateCart(parseInt(id), {
                merge: true,
                products: [
                    { id: productId, quantity }
                ]
            });
            const { data } = await fetchCartById(parseInt(id));
            setCart(data);
            alert('Cart updated (mock API).');
        } catch (err: any) {
            setError(err.message || 'Failed to update cart');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteCart = async () => {
        if (!id) return;
        const confirmed = window.confirm('Delete this cart?');
        if (!confirmed) return;
        try {
            setSaving(true);
            setError('');
            await deleteCart(parseInt(id));
            navigate('/carts');
        } catch (err: any) {
            setError(err.message || 'Failed to delete cart');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!cart) return <ErrorMessage message="Cart not found" />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Cart #{cart.id}</h1>
                    <div className="flex flex-wrap gap-2">
                        <Button label="Delete" onClick={handleDeleteCart} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300" />
                        <Button label="Back to Carts" onClick={() => navigate('/carts')} />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-600">User ID</p>
                            <p className="text-gray-900 font-medium">{cart.userId}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Quantity</p>
                            <p className="text-gray-900 font-medium">{cart.totalQuantity}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total</p>
                            <p className="text-gray-900 font-medium">${cart.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
                    </div>
                    <div className="divide-y">
                        {cart.products.map((p) => (
                            <div key={p.id} className="p-4 flex items-center gap-4">
                                {p.thumbnail && (
                                    <img src={p.thumbnail} alt={p.title} className="w-16 h-16 object-cover rounded" />
                                )}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{p.title}</p>
                                    <p className="text-gray-600">Qty: {p.quantity} • Price: ${p.price} • Total: ${p.total}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleAddProduct} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product ID</label>
                        <input
                            type="number"
                            value={productId}
                            onChange={(e) => setProductId(parseInt(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="flex items-end">
                        <Button label={saving ? 'Saving...' : 'Add to Cart'} type="submit" className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300" />
                    </div>
                </form>
            </div>
        </div>
    );
}


