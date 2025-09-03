import { Router, Route } from "wouter";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route>
        {() => <Home />}
      </Route>
    </Router>
  );
}

export default App;