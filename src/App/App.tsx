import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from '../Home';
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import Dashboard from "../Dashboard";

import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  )
);

const App = () => (<RouterProvider router={router} />);

export default App;