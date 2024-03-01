import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import axios from 'axios'
axios.defaults.withCredentials = true;

import store from './app/store';
import {Provider} from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import Kriteria from './pages/Kriteria';

import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },{
    path: "/kriteria",
    element: <Kriteria/>,
  },{
    path: "/register",
    element: <Register/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)