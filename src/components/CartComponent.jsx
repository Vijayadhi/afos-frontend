import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartComponent({ cart, setCart }) {
    const navigate = useNavigate();

    // State to track quantities
    const [quantities, setQuantities] = useState(
        cart.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
        }, {})
    );

    // State for Order Note
    const [order_message, setOrderMessage] = useState('');

    useEffect(() => {
        // Update quantities if cart changes
        setQuantities(cart.reduce((acc, item) => {
            acc[item.id] = quantities[item.id] || 1;
            return acc;
        }, {}));
    }, [cart]);

    // Calculate total items and price
    const totalItems = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price_per_unit) * quantities[item.id], 0);

    // Handle quantity change
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= cart.find(item => item.id === id).quantity) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [id]: newQuantity,
            }));
        } else {
            alert(`The quantity cannot exceed ${cart.find(item => item.id === id).quantity}`);
        }
    };

    // Handle delete item
    const handleDeleteItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);

        const updatedQuantities = { ...quantities };
        delete updatedQuantities[id];
        setQuantities(updatedQuantities);
    };

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const seat_number = sessionStorage.getItem('seat_number');
            
            const cartItems = cart.map((item) => ({
                food_id: item.id,
                quantity: quantities[item.id],
            }));

            // Make POST request
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/cart/add-foods/`, {
                food_items: cartItems,
                seat_number: seat_number,
                order_message: order_message, // Include the order note
            });

            if (response.status === 200) {
                setCart([]);
                setOrderMessage(''); // Clear the order note
                toast.success(`Order Placed Successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate('/my_orders');
            }
        } catch (error) {
            toast.error("You Cannot Place order until Previous order is complete.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                            <p className="mb-5 text-center">
                                <i className="text-info font-weight-bold">{cart.length}</i> items in your cart
                            </p>

                            {/* Cart Table */}
                            <table id="shoppingCart" className="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }}>Product</th>
                                        <th style={{ width: '12%' }}>Price</th>
                                        <th style={{ width: '10%' }}>Quantity</th>
                                        <th style={{ width: '12%' }}>Total Price</th>
                                        <th style={{ width: '6%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center fs-3">Your Cart is empty<br/><a href='/my_orders' className='fs-5'>My Orders</a></td>
                                        </tr>
                                    ) : (
                                        cart.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-md-3 text-left">
                                                            <img
                                                                src={item.image || 'https://via.placeholder.com/150'}
                                                                alt={item.food_title}
                                                                className="img-fluid d-none d-md-block rounded mb-2 shadow"
                                                            />
                                                        </div>
                                                        <div className="col-md-9 text-left mt-sm-3">
                                                            <h4>{item.food_title}</h4>
                                                            <p className="font-weight-light fs-6">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <i className="fa-solid fa-indian-rupee-sign"></i> {item.price_per_unit}/unit
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control text-center"
                                                        min={1}
                                                        value={quantities[item.id]}
                                                        max={item.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <i className="fa-solid fa-indian-rupee-sign"></i> {(item.price_per_unit * quantities[item.id]).toFixed(2)}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-md"
                                                        onClick={() => handleDeleteItem(item.id)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            {/* Order Note */}
                            {/* <div className="mt-4">
                                <label htmlFor="order_message" className="form-label">Order Note</label>
                                <textarea
                                    className="form-control"
                                    id="order_message"
                                    rows="3"
                                    placeholder="Enter any special instructions here..."
                                    value={order_message}
                                    onChange={(e) => setOrderMessage(e.target.value)}
                                ></textarea>
                            </div> */}

                            {/* Subtotal */}
                            <div className="float-right text-end mt-4">
                                <h5>Subtotal:</h5>
                                <h2>
                                    <i className="fa-solid fa-indian-rupee-sign"></i> {totalPrice.toFixed(2)}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Checkout */}
                    <div className="row mt-4 d-flex align-items-end">
                        <div className="col-sm-6 text-end">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                        <div className="col-sm-6 text-md-left">
                            <button
                                className="btn btn-link"
                                onClick={() => navigate('/')}
                            >
                                <i className="fas fa-arrow-left"></i> Back to home
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default CartComponent;
