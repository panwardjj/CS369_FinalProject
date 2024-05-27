import React from 'react';
import ProductList from './pages/ProductList';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';
import ProductById from './pages/ProductById';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="page3" element={<Page3 />} />
            <Route path="/product/:id" element={<ProductById />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(<App/>);