import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root/Root.jsx";
import Home from "./Pages/Home/Home.jsx";
import ErrorPage from "./Shared/ErrorPage.jsx";
import AuthProvider from "./Auth Context/AuthProvider.jsx";
import SignIn from "./Auth/Login.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import AddServices from "./Pages/Add Services/AddServices.jsx";
import PrivateRoute from "./Private Route/PrivateRoute.jsx";
import AllServices from "./Pages/All Services/AllServices.jsx";
import DetailsService from "./Components/DetailsService.jsx";
import ManageServices from "./Pages/Manage Services/ManageServices.jsx";
import BookedServices from "./Pages/Booked Services/BookedServices.jsx";
import ToDoServices from "./Pages/To_Do_Services/ToDoServices.jsx";
import ForumPage from "./Pages/Forum Page/ForumPage.jsx";
import ForumSection from "./Components/ForumSection.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signIn",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addServices",
        element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/allServices",
        element: <AllServices></AllServices>,
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <DetailsService />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://edu-hub-bangla-server.vercel.app/services/addServices/${params.id}`, {
            method: 'GET',
            credentials: 'include'  // Add this to send cookies with the request
          }),
      },
      {
        path: "/manage-services",
        element: (
          <PrivateRoute>
            <ManageServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/booked-services",
        element: (
          <PrivateRoute>
            <BookedServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/to-do-services",
        element: (
          <PrivateRoute>
            <ToDoServices></ToDoServices>
          </PrivateRoute>
        ),
      },
      {
        path:'/forum',
        element:<ForumPage/>
      },
      {
        path:'/forum-section',
        element:<ForumSection/>
      }
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
