//import { useState } from 'react'
import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Carrito from "./components/Carrito/Carrito";
import QuienesSomos from "./components/QuienesSomos/QuienesSomos";
import DetalleProducto from "./components/DetalleProducto/DetalleProducto";
import Checkout from "./components/Checkout/Checkout";
import UsuariosList from "./components/Usuarios/UsuariosList";
import UsuarioForm from "./components/Usuarios/UsuarioForm";
import ProductosList from "./components/Productos/ProductosList";
import ProductoForm from "./components/Productos/ProductoForm";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import "./App.css";
import Registro from "./components/Registro/Registro";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <section id="content" classNameName="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/QuienesSomos" element={<QuienesSomos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/usuarios" element={<UsuariosList />} />
          <Route path="/admin/usuarios/nuevo" element={<UsuarioForm />} />
          <Route path="/admin/usuarios/:id" element={<UsuarioForm />} />
          <Route path="/admin/productos" element={<ProductosList />} />
          <Route path="/admin/productos/nuevo" element={<ProductoForm />} />
          <Route path="/admin/productos/:id" element={<ProductoForm />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

/*
function App() {
  return (
    <div>
      <Login />
      <Home />
    </div>
  );
}
*/
export default App;
