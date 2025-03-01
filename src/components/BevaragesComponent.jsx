import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BeveragesComponent({ addToCart, cart }) {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const navigate = useNavigate();

    // Function to check if food is already in the cart
    const isFoodInCart = (foodId) => {
        return cart.some(item => item.id === foodId); // Check if the item is in the cart
    };

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/foodload/`);
                // Filter the foods to only include "Beverages"
                const filteredFoods = response.data.filter(food => food.category === "BEVERAGES");
                setFoods(filteredFoods);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch food data');
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(foods.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (food) => {
        addToCart(food);
        toast.success(`${food.food_title} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="container">
            <h1 className="my-4">Beverages Menu</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {currentFoods.map((food) => (
                    <div className="col-lg-4 col-sm-6 mb-4" key={food.id}>
                        <div className="card h-120">
                            <a href="#">
                                <img 
                                    className="card-img-top" 
                                    src={food.image || "https://via.placeholder.com/700x400"} 
                                    alt={food.food_title} 
                                    height="240" 
                                />
                            </a>
                            <div className="card-body">
                                <h5 className="card-title text-center fs-4" style={{ textTransform: 'uppercase' }}>
                                    {food.food_title}&nbsp;
                                    <span className="fs-6">
                                        {food.food_type === "VEGETARIAN" ? (
                                            <i className="fa-solid fa-seedling"></i>
                                        ) : (
                                            <i className="fa-solid fa-drumstick-bite"></i>
                                        )}
                                    </span>
                                </h5>
                                <p>Category: <strong>{food.category}</strong></p>
                                <p>Quantity: <strong>{food.quantity}</strong></p>
                                <p className="card-text">{food.description}</p>
                                <h6 className="text-center">
                                    Price: <b className="fs-2"><i className="fa-solid fa-indian-rupee-sign"></i> {food.price_per_unit}</b><sub>/unit</sub>
                                </h6>
                                <button 
                                    className={isFoodInCart(food.id)?"btn btn-secondary w-100": "btn btn-outline-primary w-100"}
                                    onClick={() => handleAddToCart(food)} // Added toast on click
                                    disabled={isFoodInCart(food.id)} // Disable if food is already in cart
                                >
                                    {isFoodInCart(food.id) ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className="page-item" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <button className="page-link">Previous</button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li className="page-item" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <button className="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                            <button
                                className="btn btn-link"
                                onClick={() => navigate('/')}
                            >
                                <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                            </button>
                        </div>

            {/* Proceed to Cart */}
            <div className="d-flex justify-content-end mt-4 fs-6">
                <button 
                    className="btn btn-outline-info btn-lg"
                    onClick={() => navigate('/cart')}
                >
                    <i className="fa-solid fa-cart-shopping"></i> Go to Cart
                </button>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default BeveragesComponent;
