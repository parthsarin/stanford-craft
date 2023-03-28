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
import ExternalLink from "../ExternalLink";
import Profile from "../Dashboard/Profile";

import { useEffect, useState } from "react";
import {
  handleSignIn,
  generateUserUpdateHandler,
  User,
  UserContext,
} from "../Auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import JoinQuiz from "../Dashboard/Datamax/JoinQuiz";
import Analyze from "../Dashboard/Analyze";
import AnalyzeQuiz from "../Dashboard/Analyze/AnalyzeQuiz";
import Credits from "../Dashboard/Credits";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/link/*" element={<ExternalLink />} />
      <Route path="/dash" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="datamax" element={<Datamax />} />
        <Route path="datamax/new" element={<NewQuiz />} />
        <Route path="datamax/quiz/:joinCode" element={<JoinQuiz />} />
        <Route path="analyze" element={<Analyze />}>
          <Route path=":joinCode" element={<AnalyzeQuiz />} />
        </Route>
        <Route path="resources" element={<Resources />} />   
        <Route path="credits" element={<Credits />} />   
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>
  )
);

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => handleSignIn(user, setUser));
    return unsubscribe;
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser: generateUserUpdateHandler(setUser) }}>
        <IdentityBar />
        <RouterProvider router={router} />
        <GlobalFooter />
      </UserContext.Provider>
    </>
  );
}

export default App;