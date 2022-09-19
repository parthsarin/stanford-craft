import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from '../Home';
import Login from "../Auth/Login";
import Dashboard from "../Dashboard";
import Profile from "../Dashboard/Profile";
import NoMatch from "../NoMatch";

import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>
  )
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;