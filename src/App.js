import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./componnents/header/navbar/login"
import Home from "./pages/Home/home"
import Boutique from "./pages/Boutique/boutique"
import Admin from "./admin/pages/Admin"
import Contact from "./pages/Contact/contact"
import Register from "./pages/Register/register"
import Login from "./pages/Login/login"
import ProductDetails from "./pages/Boutique/ProductDetails"
import ArticleDetail from "./pages/Articles/articleDetail"
import Blog from "./pages/Articles/articles"
import Panier from "./pages/Panier/panier"


function App(props){
    return(
        <>
            <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/boutique" element={<Boutique />} />
                        <Route path="/boutique/:id" element={<ProductDetails />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<ArticleDetail />} />
                        <Route path="/panier" element={<Panier />} />
                    </Routes>
            </Router>
        </>
    )
}

export default App