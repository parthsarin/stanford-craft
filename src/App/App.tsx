import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "../Home";
import Dashboard from "../Dashboard";
import Resources from "../Dashboard/Resources";
import NoMatch from "../NoMatch";

import "./App.css";
import Datamax from "../Dashboard/Datamax";
import Prompty from "../Dashboard/Prompty";
import PlayPrompty from "../Dashboard/Prompty/PlayPrompty";
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
import About from "../Dashboard/About";
import JobPosting from "../JobPosting";
import ExploreQuiz from "../Dashboard/Analyze/ExploreQuiz";
import Contact from "../Dashboard/Contact";
import ViewMessage from "../Dashboard/Contact/ViewMessages/ViewMessage";

import Resource from "../Dashboard/Resource";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<JobPosting />} />
      <Route path="/link/*" element={<ExternalLink />} />
      <Route path="/dash" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="datamax" element={<Datamax />} />
        <Route path="datamax/new" element={<NewQuiz />} />
        <Route path="datamax/quiz/:joinCode" element={<JoinQuiz />} />
        <Route path="prompty" element={<Prompty />} />
        <Route path="prompty/:joinCode" element={<PlayPrompty />} />
        <Route path="analyze" element={<Analyze />}>
          <Route path=":joinCode" element={<AnalyzeQuiz />} />
        </Route>
        <Route path="explore/:joinCode" element={<ExploreQuiz />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resource/:resourceID" element={<Resource />} />
        <Route path="contact" element={<Contact />} />
        <Route path="contact/view/:messageId" element={<ViewMessage />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>
  )
);

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleSignIn(user, setUser).then(() => setUserLoading(false));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser: generateUserUpdateHandler(setUser),
          loading: userLoading,
        }}
      >
        <IdentityBar />
        <RouterProvider router={router} />
        <GlobalFooter />
      </UserContext.Provider>
    </>
  );
};

export default App;
