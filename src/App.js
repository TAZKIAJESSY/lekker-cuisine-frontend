import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBarItem";
import HomePage from "./pages/Home/HomePage";
import SignUp from "./pages/SignUp/SignUpPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
