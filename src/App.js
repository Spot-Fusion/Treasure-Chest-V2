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
import ProfilePage from './pages/ProfilePage'
import CreateListingPage from './pages/CreateListingPage'
import DrawerNav from './components/DrawerNav'
import CustomHeader from './components/CustomHeader'
import BottomTabNav from './components/BottomTabNav';

function App() {
  const [headerVisible, setHeaderVisible] = React.useState(false)
  const [menuVisible, setMenuVisible] = React.useState(false) 
  const [redirect, setRedirect] = React.useState(false)
  const [footerVisible, setFooterVisible] = React.useState(false)

  const setMenu = () => {
    setHeaderVisible(!headerVisible)
    setRedirect(!redirect);
    setFooterVisible(!footerVisible);
  };
  
  const slideMenu = () => setMenuVisible(!menuVisible);

  return (
    <Router>
      <div className="App" styles={{height: '100%'}}>        
       {headerVisible ? <CustomHeader slideMenu={slideMenu} /> : null}
       <main styles={{marginTop: '50px'}}>
       {menuVisible ? <DrawerNav slideMenu={slideMenu} /> : null}
       {redirect ? <Redirect to={{pathname: '/home'}} /> : null }
        <Switch>
          <Route exact path="/" render={() => (<LoginPage setMenu={setMenu}/>)} />
          <Route exact path="/messages" render={() => (<MessagesPage />)} />
          <Route exact path="/users" render={() => (<UsersPage />)} />          
          <Route exact path="/home" render={() => (<HomePage />)} />
          <Route exact path="/profile" render={() => (<ProfilePage />)} /> 
          <Route exact path="/createlisting" render={() => (<CreateListingPage />)} />           
        </Switch>
       </main>
       {footerVisible ? <BottomTabNav /> : null}
      </div>
    </Router>
  )
}

export default App;
