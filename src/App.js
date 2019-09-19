import React from 'react';
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import PrivateRoute from "./routes/PrivateRoute";
import Authenticated from "./authentication/Authenticated";
import HomeBar from "./home/components/HomeBar";
function App() {
  return (
    <Router>
        <HomeBar/>
    </Router>
  );
}

export default App;
