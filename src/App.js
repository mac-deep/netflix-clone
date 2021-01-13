import "./App.css";
import Home from "./Components/Home/Home";
// import requests from "./request";

import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fullpage from "./Components/Fullpage/Fullpage";

function App() {
  return (
    <Router>
      <div className="app" id="style-1">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movie/:id" component={Fullpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
