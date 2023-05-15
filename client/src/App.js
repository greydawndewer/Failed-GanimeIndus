import React, { Component} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

//import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import SignUp from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateRoute1 from "./components/private-route/PR2";
import Dashboard from "./components/dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (

        <Provider store={store}>
        <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={ <Landing/>} />
            <Route path="/signup" element={ <SignUp/> } />
            <Route path="/login" element={ <Login/>} />
            <Route path="/dashboard" element={ <PrivateRoute1><Dashboard/></PrivateRoute1>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>  
      </Router>
      </Provider>
    );
  }
}
export default App;