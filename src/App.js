import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Nav from "./components/Nav";
import PrivateRoute from "./helper/PrivateRoute";
import Home from "./Pages/Home";
import Latest from "./Pages/Latest";
import Login from "./Pages/Login";
import MyList from "./Pages/MyList";
import SingleMovie from "./Pages/SingleMovie";
import Upcoming from "./Pages/Upcoming";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    getLocalAuth();
  }, []);

  const getLocalAuth = () => {
    if (localStorage.hasOwnProperty("isAuthenticated")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };
  return (
    <ToastProvider autoDismiss autoDismissTimeout={6000}>
      <Router>
        <Nav
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/mylist" element={<MyList />} />
          </Route>
          <Route path="/error" element={<Error />} />
          <Route
            path="/toprated"
            element={
              <Latest isAuthenticated={isAuthenticated} toprated={true} />
            }
          />
          <Route
            path="/upcoming"
            element={
              <Upcoming isAuthenticated={isAuthenticated} upcoming={true} />
            }
          />
          <Route
            path="/movie/:id"
            element={<SingleMovie isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
