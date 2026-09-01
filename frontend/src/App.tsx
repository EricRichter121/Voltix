// import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
// import NotFoundPage from './pages/NotFoundPage'
import CategoriesPage from './pages/CategoriesPage'

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <NavBar />

      {/* В main.tsx нужно использовать BrowserRouter для App, иначе роутинг не будет работать */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>

      <Footer />
    </div>

    
  )
}

export default App