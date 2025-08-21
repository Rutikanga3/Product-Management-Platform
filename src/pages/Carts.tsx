import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import { fetchCarts, addCart } from '../app/api';
import type { Cart } from '../types/cart';
import type { User } from '../types/user';

export default function Carts() {
    const navigate = useNavigate();
    const [carts, setCarts] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const loggedInUser: User = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const [userId, setUserId] = useState<number>(loggedInUser.id || 1);
    const [productId, setProductId] = useState<number>(144);
    const [quantity, setQuantity] = useState<number>(1);

    const loadCarts = async () => {
        try {
            setLoading(true);
            setError('');
            const { data } = await fetchCarts();
            setCarts(data.carts);
        } catch (err: any) {
            setError(err.message || 'Failed to load carts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCarts();
    }, []);

    const handleAddCart = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            await addCart({
                userId,
                products: [
                    {
                        id: productId,
                        quantity,
                    },
                ],
            });
            await loadCarts();
            alert('Cart added.');
        } catch (err: any) {
            setError(err.message || 'Failed to add cart');
        } finally {
            setLoading(false);
        }
    };

    if (loading && carts.length === 0) return <Loader />;
    if (error && carts.length === 0) return <ErrorMessage message={error} />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Carts</h1>

                <form onSubmit={handleAddCart} className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User ID</label>
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(parseInt(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
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
                        <Button label="Add Cart" type="submit" />
                    </div>
                </form>

                {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {carts.map((cart) => (
                        <div key={cart.id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Cart #{cart.id}</h2>
                                    <p className="text-gray-600">User: {cart.userId}</p>
                                    <p className="text-gray-600">Items: {cart.totalQuantity} • Total: ${cart.total}</p>
                                </div>
                                <div>
                                    <Button label="View" onClick={() => navigate(`/carts/${cart.id}`)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


