import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./login";
import Signup from "./signup"
import Home from "./Home"; 
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import LearningPath from "./LearningPath";
import Settings from "./Settings";
import Resume from "./Resume";
import JobMatches from "./JobMatches";
import './App.css';
import About from "./About";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Default route
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />, 
  },
  {
    path: "learning-path",
    element: <LearningPath />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }, 
  {
    path: "/settings",
    element: <Settings/>
  },
  {
    path: "/resume",
    element: <Resume/>
  },
  {
    path: "/job-matches",
    element: <JobMatches/>
  },

  {
    path: "/about",
    element: <About />,
  },

]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
