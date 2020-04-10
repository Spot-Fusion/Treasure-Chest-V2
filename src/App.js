import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import MessagesPage from './pages/MessagesPage'
import LoginPage from './pages/LoginPage';
import DrawerNav from './components/DrawerNav'

function App() {
  const [menuVisible, setMenuVisible] = React.useState(false) 
  const [redirect, setRedirect] = React.useState(false)

  const setMenu = () => {
    setMenuVisible(!menuVisible);
    setRedirect(!redirect);
  };

  return (
    <Router>
      <div>
       {menuVisible ? <DrawerNav /> : null}
       {redirect ? <Redirect to={{pathname: '/home'}} /> : null }
        <Switch>
          <Route exact path="/" render={() => (<LoginPage setMenu={setMenu}/>)} />
          <Route exact path="/messages" render={() => (<MessagesPage />)} />
          <Route exact path="/users" render={() => (<UsersPage />)} />          
          <Route exact path="/home" render={() => (<HomePage />)} />            
        </Switch>
      </div>
    </Router>
  )
}


export default App;
