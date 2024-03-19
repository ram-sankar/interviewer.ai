import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { GenerateQuestions } from "../pages/GenerateQuestions";
import { Home } from "../pages/Home";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
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