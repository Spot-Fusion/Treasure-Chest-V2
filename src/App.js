import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import MessagesPage from './pages/MessagesPage'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/messages" render={() => (<MessagesPage />)} />
          <Route exact path="/users" render={() => (<UsersPage />)} />          
          <Route exact path="/home" render={() => (<HomePage />)} />            
        </Switch>
      </div>
    </Router>
  );
}

export default App;
