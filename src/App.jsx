import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import FoodComponent from './components/FoodComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import CartComponent from './components/CartComponent';
import MyOrdersComponents from './components/MyOrdersComponents';
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component
import BeveragesComponent from './components/BevaragesComponent';
import AssistantComponent from './components/AssistantComponent';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prevCart) => [...prevCart, food]);
  };

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path='/' element={<PrivateRoute element={<HomeComponent />} />} />

          {/* <Route path='/' element={} /> */}
          <Route path='/food' element={<PrivateRoute element={<FoodComponent addToCart={addToCart} cart={cart} />} />} />
          <Route path='/bevarages' element={<PrivateRoute element={<BeveragesComponent addToCart={addToCart} cart={cart} />} />} />

          {/* <Route path='/' element={<PrivateRoute element={<HomeComponent />} />} /> */}


          <Route path='/my_orders' element={<PrivateRoute element={<MyOrdersComponents />} />} />
          <Route path="/cart" element={<PrivateRoute element={<CartComponent cart={cart} setCart={setCart} />} />} />

          <Route path="/call_for_support" element={<PrivateRoute element={<AssistantComponent cart={cart} setCart={setCart} />} />} />

        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
