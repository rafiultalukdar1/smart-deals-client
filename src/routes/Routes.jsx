import { createBrowserRouter } from "react-router";
import Root from "../components/layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProducts from "../pages/AllProducts/AllProducts";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-products',
                Component: AllProducts
            },
            {
                path: '/my-products',
                element: <h2>My Products</h2>
            },
            {
                path: '/my-bids',
                element: <h2>My Bids</h2>
            },
            {
                path: '/create-product',
                element: <h2>Create Product</h2>
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            }
        ]
    }
]);