import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import EditTask from "../Pages/EditTask/EditTask";
import Login from "../Pages/Login/Login";
import MyTask from "../Pages/MyTask/MyTask";
import ViewMedia from "../Pages/MyTask/ViewMedia";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <AddTask></AddTask>,
            },
            {
                path: '/MyTask',
                element: <MyTask></MyTask>,
            },
            {
                path: '/viewMedia/:id',
                loader: ({ params }) => fetch(`https://my-app-server-ruddy.vercel.app/allTasks/${params.id}`),
                element: <PrivateRoute><ViewMedia></ViewMedia></PrivateRoute>,
            },
            {
                path: '/EditTask/:id',
                loader: ({ params }) => fetch(`https://my-app-server-ruddy.vercel.app/allTasks/${params.id}`),
                element: <EditTask></EditTask>,
            },
            {
                path: '/CompletedTask',
                element: <CompletedTask></CompletedTask>,
            },
            {
                path: '/Register',
                element: <Register></Register>,
            },
            {
                path: '/Login',
                element: <Login></Login>,
            },
        ]
    }
])