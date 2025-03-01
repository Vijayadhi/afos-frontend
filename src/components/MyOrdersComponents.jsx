import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/orders.css";

function MyOrdersComponent() {
    const [latestOrder, setLatestOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const seatNumber = sessionStorage.getItem('seat_number') || '123'; // Replace with dynamic logic if needed

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/cart/get-orders/?seat_number=${seatNumber}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setLatestOrder(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        // Fetch orders on component mount
        fetchOrders();

        // Fetch orders periodically to update status every 5 seconds
        const intervalId = setInterval(fetchOrders, 5000); // 5000 ms = 5 seconds

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);

    }, [seatNumber]);

    if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary"></div> Loading orders...</div>;
    if (error) return <p className="alert alert-danger text-center">{error}</p>;

    return (
        <div className="container my-4">
            <article className="card shadow-sm border-0">
                <header className="card-header bg-primary text-white text-center fw-bold">
                    🛒 Latest Order for Seat {seatNumber}
                </header>

                {latestOrder && (
                    <div className="card-body">
                        {/* Order Details */}
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border rounded">
                                    {/* <strong>Estimated Delivery:</strong><br />
                                    <span className="text-muted">{latestOrder.estimated_delivery}</span> */}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border rounded">
                                    <strong>Status:</strong><br />
                                    <span className={`badge ${latestOrder.order_status === 'DELIVERED' ? 'bg-success' : 'bg-warning'}`}>
                                        {latestOrder.order_status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Status Tracking */}
                        {/* Order Status Tracking */}
                        <div className="track mb-4 d-flex justify-content-around text-center">
                            <div className={`step ${['TAKEN', 'PROCESSING', 'DELIVERED'].includes(latestOrder.order_status) ? 'active' : ''}`}>
                                <span className="icon"><i className="fa fa-check"></i></span>
                                <p className="small">Order Taken</p>
                            </div>
                            <div className={`step ${['PROCESSING', 'DELIVERED'].includes(latestOrder.order_status) ? 'active' : ''}`}>
                                <span className="icon"><i className="fa fa-truck"></i></span>
                                <p className="small">Processing</p>
                            </div>
                            <div className={`step ${latestOrder.order_status === 'DELIVERED' ? 'active' : ''}`}>
                                <span className="icon"><i className="fa fa-box"></i></span>
                                <p className="small">Delivered</p>
                            </div>
                        </div>


                        {/* Food Items Section */}
                        <h5 className="fw-bold mt-4">🍽️ Ordered Food Items:</h5>
                        {latestOrder.food_items && latestOrder.food_items.length > 0 ? (
                            <div className="food-items-list row g-3">
                                {latestOrder.food_items.map((item, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="food-item p-3 border rounded d-flex align-items-center">
                                            <img
                                                src={item.food.image ? `${import.meta.env.VITE_BACKEND_API}${item.food.image}` : 'https://via.placeholder.com/100'}
                                                className="img-thumbnail me-3"
                                                alt={item.food.food_title || 'Food Item'}
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <p className="fw-bold mb-1">{item.food.food_title}</p>
                                                <span className="text-muted">Quantity: {item.quantity}</span><br />
                                                <span className="text-muted">Price: <i className="fa-solid fa-indian-rupee-sign"></i>{item.total_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No food items in this order.</p>
                        )}

                        {/* Total Price */}
                        <div className="mt-4">
                            <h5 className="fw-bold">💵 Total Price: <span className="text-primary"><i className="fa-solid fa-indian-rupee-sign"></i> {latestOrder.total_price}</span></h5>
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="text-center mb-3">
                    <a href="/" className="btn btn-outline-primary mt-3">
                        <i className="fa fa-chevron-left"></i> Back to home
                    </a>
                </div>
            </article>
        </div>
    );
}

export default MyOrdersComponent;
