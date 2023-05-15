import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/shop/Shop';
import Home from './components/layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import CartProductsLoaders from './Loaders/CartproductLoaders';
import CheckOut from './components/Checkout/CheckOut';
import Sing_Up from './components/SingUp/Sing_Up';
import AuthProvaider from './components/provaiders/authProvaider';
import PrivateRoute from './components/routes/PrivateRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/totalProducts')
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: CartProductsLoaders
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <Sing_Up></Sing_Up>
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvaider>
      <RouterProvider router={router} />
    </AuthProvaider>
  </React.StrictMode>,
)
