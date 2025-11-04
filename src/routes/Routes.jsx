import { createBrowserRouter } from "react-router";
import Root from "../components/layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProducts from "../pages/AllProducts/AllProducts";
import PrivetRoute from "../context/PrivetRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import MyBids from "../pages/MyBids/MyBids";


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
                element: <PrivetRoute>
                    <h2>My Products</h2>
                </PrivetRoute>
            },
            {
                path: '/my-bids',
                element: <PrivetRoute>
                    <MyBids></MyBids>
                </PrivetRoute>
            },
            {
                path: '/create-product',
                element: <PrivetRoute>
                    <h2>Create Product</h2>
                </PrivetRoute>
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/product-details/:id',
                loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <PrivetRoute>
                    <ProductDetails></ProductDetails>
                </PrivetRoute>
            }
        ]
    }
]);