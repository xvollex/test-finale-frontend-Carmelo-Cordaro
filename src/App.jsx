//import Homepage from "./components/Homepage/Homepage"//export default

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Pages/Home/Home";
import { NotFound } from "./components/Pages/NotFound/NotFound";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Layout } from "./components/Layout/MainLayout/Layout";
import { Login } from "./components/Pages/Login/Login";
import { Register } from "./components/Pages/Register/Register";
import { Meteo } from "./components/Pages/Meteo/Meteo";


const router = createBrowserRouter
([
    {
        element :   
                <Layout/>,
        children : 
        [
            {
                path : "/",
                children : 
                [
                     {
                         path: "",
                         element: <Home/>
                     },
                     {
                    path: "register",
                    element: <Register/>
                    },
                    {
                        path: "login",
                        element: <Login/>
                    },
                    {
                        path: "meteo",
                        element: <Meteo/>
                    },

                ]
             },
             {
                 path: "*",
                 element: <NotFound/>
             }
        ]
    }
]);
       
export function App()
{
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}