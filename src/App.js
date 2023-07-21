import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import UserIndex from './pages/User/index'
import UserInput from './pages/User/Input'
import UpdateUser from './pages/User/Update';

import AparIndex from './pages/APAR/index'
import AparInput from './pages/APAR/Input'
import AparUpdate from './pages/APAR/Update';

import P3KIndex from './pages/P3K/index'
import P3KInput from './pages/P3K/Input'
import P3KUpdate from './pages/P3K/Update';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <UserIndex />,
  },
  {
    path: "/p3k",
    element: <P3KIndex />,
  },
  {
    path: "/apar",
    element: <AparIndex />,
  },
  {
    path: "/user/input",
    element: <UserInput />,
  },
  {
    path: "/p3k/input",
    element: <P3KInput />,
  },
  {
    path: "/apar/input",
    element: <AparInput />,
  },
  {
    path: "/user/update/:id",
    element: <UpdateUser />,
  },
  {
    path: "/p3k/update/:id",
    element: <P3KUpdate />,
  },
  {
    path: "/apar/update/:id",
    element: <AparUpdate />,
  },

 ])


 const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
