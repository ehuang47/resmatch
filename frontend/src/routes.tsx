import AddInvite from "@/pages/AddInvite/AddInvite";
import HomePage from "@/pages/HomePage";
import Invites from "@/pages/Invites/Invites";
import Login from "@/pages/Login/Login";
import Programs from "@/pages/Programs/Programs";
import RootLayout from "@/pages/RootLayout/RootLayout";
import SignUp from "@/pages/SignUp/SignUp";
import AddProgram from "@/pages/AddProgram/AddProgram";
import Users from "@/pages/Users/Users";
import AddUser from "@/pages/AddUser/AddUser";
import Cities from "@/pages/Cities/Cities";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "invite",
        element: <Invites />,
      },
      {
        path: "invite/add",
        element: <AddInvite />,
      },
      {
        path: "program",
        element: <Programs />,
      },
      {
        path: "program/:id",
        element: <AddProgram />,
      },
      {
        path: "user",
        element: <Users />,
      },
      {
        path: "user/:id",
        element: <AddUser />,
      },
      {
        path: "city",
        element: <Cities />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmail />,
      },
    ],
  },
];

export default routes;
