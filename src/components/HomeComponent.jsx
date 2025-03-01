import React from 'react'
import HeaderComponent from './HeaderComponent'
import { Link, useNavigate } from 'react-router-dom'
import "../assets/home.css"

function HomeComponent() {
    const navigate = useNavigate();

    return (
        <>
            <section className="py-5">
                <div className="container text-center">
                    <h1 className="fw-light display-4">Airline Food Ordering and Tracking System</h1>
                    <p className="lead text-muted mb-5">Experience breathtaking destinations, premium airline services, and stunning views through our interactive carousel. Each slide unveils a unique travel story, guiding you through vibrant landscapes, luxurious flights, and inspiring adventures. Let your journey begin here! 🛫✨</p>
                </div>
            </section>

            <div className="container">
                {/* Page Heading */}
                <h1 className="my-4 text-center fw-bold text">
                    <small className="text-muted">Explore our services</small>
                </h1>

                <div className="row">
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <div className="card h-100 shadow-sm hover-effect">
                            <a href="/food"><img className="card-img-top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20240309%2Fourmid%2Fpngtree-airline-food-vector-concept-color-illustration-png-image_11902885.png&f=1&nofb=1&ipt=226848c750b04d31de870724b9b030cd164a6dbeb0458b1aa18b060f1eb0172c&ipo=images" alt="Food" /></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <Link to="/food" className="text-decoration-none text-dark">Food</Link>
                                </h4>
                                {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt?</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <div className="card h-100 shadow-sm hover-effect">
                            <a href="/bevarages"><img className="card-img-top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F003%2F251%2F945%2Fnon_2x%2Fdrinks-beverages-watercolor-illustration-vector.jpg&f=1&nofb=1&ipt=082e16d37a40cd1ab99d09c8ef4828550117944acff0d96a91fc247a32ba86a3&ipo=images" alt="Beverages" /></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <a href="/bevarages" className="text-decoration-none text-dark">Beverages</a>
                                </h4>
                                {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio.</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <div className="card h-100 shadow-sm hover-effect">
                            <a href="/call_for_support"><img className="card-img-top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F12268686%2Fr%2Fil%2Fd23b87%2F1016146525%2Fil_1080xN.1016146525_ba9g.jpg&f=1&nofb=1&ipt=b89c479ad4b7cde699b1394b33f4ad9a64097bc9035b1e9b9f82e5b9e9734677&ipo=images" alt="Assistance" /></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <a href="/call_for_support" className="text-decoration-none text-dark">Assistance</a>
                                </h4>
                                {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio.</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <div className="card h-100 shadow-sm hover-effect">
                            <a href="/my_orders"><img className="card-img-top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20240309%2Fourmid%2Fpngtree-airline-food-vector-concept-color-illustration-png-image_11902886.png&f=1&nofb=1&ipt=14ddba28b78fc17310a57ea1029ee2382c8b9d7c31515fa8ac4b51f6f2155499&ipo=images" alt="My Orders"  /></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <a href="/my_orders" className="text-decoration-none text-dark">My Orders</a>
                                </h4>
                                {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeComponent;
