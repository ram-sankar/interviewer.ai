import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { GenerateQuestions } from "../pages/GenerateQuestions";
import { Home } from "../pages/Home";
//import { MainPage } from "../pages/MainPage";

import Login from "../pages/Login";
import Signup from "../pages/Signup";




const mainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },
    

    {
        path: "/generate-questions",
        element: <GenerateQuestions />,
    },
    {
        path: "/home",
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ":productId",
                element: <Home />,
            },
        ],
    },
]);

export default mainRoutes;