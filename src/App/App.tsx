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

import './App.css';
import Datamax from "../Dashboard/Datamax";
import NewQuiz from "../Dashboard/Datamax/NewQuiz";
import IdentityBar from "../Generic/Brand/IdentityBar";
import GlobalFooter from "../Generic/Brand/GlobalFooter";
import { useState } from "react";
import { handleSignIn, User, UserContext } from "../Auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ExternalLink from "../ExternalLink";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/link/*" element={<ExternalLink />} />
      <Route path="/dash" element={<Dashboard />}>
        <Route path="datamax" element={<Datamax />} />
        <Route path="datamax/new" element={<NewQuiz />} />
        <Route path="resources" element={<Resources />} />   
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>
  )
);

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
    if (user) handleSignIn(user);
  })

  return (
    <>
      <UserContext.Provider value={ user }>
        <IdentityBar />
        <RouterProvider router={router} />
        <GlobalFooter />
      </UserContext.Provider>
    </>
  );
}

export default App;