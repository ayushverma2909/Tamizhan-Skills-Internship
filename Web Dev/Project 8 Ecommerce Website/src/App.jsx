import { useState } from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wishlist from './Pages/Wishlist';
import AddToCart from './Pages/AddToCart';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/addtocart' element={<AddToCart />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
