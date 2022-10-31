import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { DataProvider } from './ContextApi';
import DetailsPage from './Pages/DetailsPage';
import AddProduct from './Components/AddProduct';
import Tshirts from './Components/Tshirts';
import Tracks from './Components/Tracks';
import Shorts from './Components/Shorts';
import Orders from './Pages/Orders';
import EditProduct from './Components/EditProduct';

function App() {
  return (
    <div className='App'>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard/tshirts' element={<Tshirts />} />
              <Route path='/dashboard/tracks' element={<Tracks />} />
              <Route path='/dashboard/shorts' element={<Shorts />} />
              <Route path='/dashboard/details/:id' element={<DetailsPage />} />
              <Route path='/dashboard/orders' element={<Orders />} />
              <Route path='/dashboard/addproduct' element={<AddProduct />} />
              <Route path='/dashboard/editproduct/:id' element={<EditProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
