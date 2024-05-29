import React from 'react';
import ProductList from './pages/ProductList';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';
import ProductById from './pages/ProductById';
import Login from './pages/Login';
import './App.css'

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Layout />}>
            <Route path="/login" element={<Login/>}/>
            <Route index element={<ProductList/>}/>
            <Route path="/catalogue" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductById />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(<App/>);