import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bill from './Bill';

function App() {
  return (
    <Router>
      <Switch>
          <Route path= "/payment" exact component={Bill}/>



      </Switch>
    </Router>
  );
}

export default App;
