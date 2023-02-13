import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from '../Home';
import Dashboard from "../Dashboard";
import Resources from "../Dashboard/Resources";
import NoMatch from "../NoMatch";

import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import Datamax from "../Dashboard/Datamax";
import NewQuiz from "../Dashboard/Datamax/NewQuiz";
import IdentityBar from "../Generic/Brand/IdentityBar";
import GlobalFooter from "../Generic/Brand/GlobalFooter";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="datamax" element={<Datamax />} />
        <Route path="datamax/new" element={<NewQuiz />} />
        <Route path="resources" element={<Resources />} />   
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>
  )
);

const queryClient = new QueryClient();

const App = () => (
  <>
    <IdentityBar />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <GlobalFooter />
  </>
);

export default App;