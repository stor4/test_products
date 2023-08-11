import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Liked from './components/Liked';
import ProductList from './components/ProductList';
import Product from './components/Product';

const App = () => (
  <BrowserRouter>
  <Box>
    <Navbar/>
    <Box sx={{display: 'flex'}}>
      <Liked/>
      <Routes>
        <Route path="/"  element={<ProductList/>} />
        <Route path='/product/:id' element={<Product/>}></Route>
      </Routes>
      </Box>
  </Box>
  </BrowserRouter>
)

export default App;
