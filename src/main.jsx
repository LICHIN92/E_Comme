import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NavBar from './components/navbar/NavBar.jsx'
import User from './components/User/User.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/homepage/HomePage.jsx'
import Home from './components/page/home/Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Item from './pages/detail/Item.jsx'
import { Provider } from 'react-redux'
import store from './redux/Store.js'
import Category from './components/Category/Category.jsx'
import Loader from './components/loader/Loader.jsx'
import Auth from './pages/auth/Auth.jsx'
import AddDress from './components/addDress/AddDress.jsx'
import Forgot from './components/forgretPassword/Forgot.jsx'


const router = createBrowserRouter([
  {
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/itemView",
        element: <Item />
      },
      {
        path:"/addDress",
        element:<AddDress/>
      }

    ]
  },
  {
    path: "/user",
    element: <Auth />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <AddDress/> */}
      {/* <Forgot/> */}
    </Provider>
  </React.StrictMode>,
)
